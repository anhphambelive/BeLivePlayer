import { SDK_API } from "../configs/APIs";
import { DEVICE_TYPES, STATUS_RESPONSES } from "../configs/SDK";
import { STATUS_MESSAGES } from "../messages/System";
import moment from "moment"
import {EXPIRED_TIME_RENEW_SSO} from "../configs/Settings";

export default {
    name: "SdkMixin",
    data() {
        return {
            webLoaded: false,
            intervalGetSSOId: null
        };
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
    },
    methods: {
        async login(ssoToken) {
            if (!ssoToken) return;
            const headers = { ssoToken };
            const dataParams = {
                deviceUdid: null,
                deviceType: parseInt(DEVICE_TYPES.WEB),
                latitude: 0,
                longitude: 0,
            };

            const instance = this.$http.create({ headers });
            let response = await instance.post(SDK_API.BELIVE_LOGIN, dataParams)
            let accessToken = null;
            if (response.data.code === STATUS_RESPONSES.SUCCESS) accessToken = response.data.data.accessToken;
            else if (response.data.code === STATUS_RESPONSES.USER_NOT_FOUND) {
                let responseRegister = await this.register(ssoToken);
                if (responseRegister.data.code === STATUS_RESPONSES.SUCCESS) accessToken = responseRegister.data.data.accessToken;
                else this.$toastr.e(response.data.message, STATUS_MESSAGES.ERROR);
            }
            else this.$toastr.e(response.data.message, STATUS_MESSAGES.ERROR);

            if (!accessToken) return;
            this.$http.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${accessToken}`;
            this.$cookies.remove("guest_token");
            this.$cookies.set("access_token", accessToken, 60*EXPIRED_TIME_RENEW_SSO);
        },
        async register(ssoToken) {
            if (!ssoToken) return { data: {} }
            const headers = { ssoToken };
            const dataParams = {
                deviceUdid: null,
                deviceType: parseInt(DEVICE_TYPES.WEB),
                latitude: 0,
                longitude: 0,
            };
            const instance = this.$http.create({ headers });
            let responseRegister = await instance.post(SDK_API.BELIVE_REGISTER, dataParams)
            return responseRegister;
        },
        async checkHasSSOToken() {
            //Check if cookie has token
            let ssoInfo = this.$cookies.get("ssoInfo") || null;
            let ssoToken = null;
            if (ssoInfo) {
                //If has token get expired date to setTimeOut to get another token
                ssoToken = ssoInfo.token;
                let duration = this.checkRemainTimeToResetAcquireToken(ssoInfo.expiredDate);
                setTimeout(() => this.getAcquireToken(ssoToken), duration);
            }
            // else check if query params have token
            else if (this.$route.query.ssoToken && this.$route.query.ssoToken !== "null") {
                ssoToken = this.$route.query.ssoToken;
                this.setAcquireToken(ssoToken, new Date(moment().add(EXPIRED_TIME_RENEW_SSO, "minutes")))
                this.$router.push({ name: this.$route.name })
            }
            if (ssoToken) await this.login(ssoToken)
        },
        checkRemainTimeToResetAcquireToken(expiredDate) {
            if (!expiredDate) return 0;
            let duration = moment(new Date(expiredDate), "DD/MM/YYYY HH:mm:ss").diff(moment(new Date(), "DD/MM/YYYY HH:mm:ss"), "miliseconds");
            return duration;
        },
        async getAcquireToken(token) {
            //get another instance of http to prevent override current authorization
            const instance = this.$http.create({
                headers: {
                    common: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Headers": "*",
                        Authorization: `Bearer ${token}`,
                    }
                }
            });
            let response = await instance.post(SDK_API.SUNTEC_ACQUIRE_TOKEN);
            if (response && response.data.status === 200) {
                this.setAcquireToken(response.data.communication_token, new Date(moment().add(EXPIRED_TIME_RENEW_SSO, "minutes")));
            }
        },
        setAcquireToken(token, expiredDate) {
            if (!token || !expiredDate) return;
            let ssoInfo = { token, expiredDate };
            // this.$cookies.set("ssoInfo", ssoInfo, "59MIN");
            this.$cookies.set("ssoInfo", ssoInfo, `${EXPIRED_TIME_RENEW_SSO}MIN`);
            if (!this.intervalGetSSOId) {
                this.intervalGetSSOId = setInterval(() => {
                    this.getAcquireToken(token);
                }, EXPIRED_TIME_RENEW_SSO * 1000 * 60)
            }
        },
        guestLogin: async function () {
            this.$cookies.remove("access_token");
            this.$cookies.remove("ssoInfo");
            this.$cookies.remove("loggedin");
            let oldGuestToken = this.$cookies.get("guest_token");
            // let oldGuestToken = null;
            if (oldGuestToken) {
                this.$http.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${oldGuestToken}`;

                this.webLoaded = true;
            }
            else {
                let _this = this;
                let token = "";
                let indexUser = Math.floor(1000 + Math.random() * 90000);
                this.$http
                    .post(SDK_API.GUEST_LOGIN, {
                        deviceUdid: `web-client-${indexUser}`,
                        deviceType: parseInt(DEVICE_TYPES.WEB)
                    })
                    .then(function (response) {
                        if (
                            response.data.code === STATUS_RESPONSES.SUCCESS &&
                            response.data.data.accessToken
                        ) {
                            _this.$store.dispatch("userLogin", response.data.data);
                            token = response.data.data.accessToken;
                            _this.$cookies.set("guest_token", token);
                            _this.$http.defaults.headers.common[
                                "Authorization"
                            ] = `Bearer ${token}`;
                            _this.webLoaded = true;
                        }
                        else
                            _this.$toastr.e(response.data.message, STATUS_MESSAGES.ERROR);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(function () {
                    });
            }
        },
    }
};
