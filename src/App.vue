<template>
    <div id="app" v-if="webLoaded">
        <Navbar @update-key-route="updateKeyRouter" v-if="!isMobileLayout || !channelStream"></Navbar>
        <div class="main main-page belive-main-page" role="main">
            <router-view
                :key="renderViewUpdate($route.name)"
                class="view-route-partial"
                id="view-route-partial"
            />
        </div>
        <!--		<Footer></Footer>-->
    </div>
</template>

<script>
import Navbar from "./sections/navbar"
import Footer from "./sections/footer"
import LoginModal from "./components/LoginModal"
import SignUpModal from "./components/SignUpModal"
import { SDK_API } from "./configs/APIs"
import { DEVICE_TYPES, MOBILE_OS, STATUS_RESPONSES } from "./configs/SDK"
import { STATUS_MESSAGES } from "./messages/System"
import { mapGetters } from "vuex"
import SdkMixins from "./mixins/SdkMixins"
import HelperMixins from "./mixins/HelperMixins"
import {SUNTEC_CONFIG} from "./configs/Settings";

export default {
    name: "App",
    components: {
        Navbar,
        Footer,
        LoginModal,
        SignUpModal,
    },
    mixins: [SdkMixins, HelperMixins],
    data() {
        return {
            keyRouter: 0,
            viewerUsingMobileOS: MOBILE_OS.UN_KNOWN,
        }
    },
    watch: {},
    computed: {
        ...mapGetters(["user", "channelStream"]),
        isMobileLayout: function() {
            if (this.isMobileLayoutSize) {
                this.$store.dispatch("updateMobileBrowserLayout", true);
                return true
            } else {
                this.$store.dispatch("updateMobileBrowserLayout", false)
                return false
            }
        },
    },
    created() {
        window.addEventListener("resize", this.onResize)
    },
    mounted() {
        this.loadSSOJs();
        this.onResize();
        // Get Viewer mobile OS / check browser support RTC
        this.viewerUsingMobileOS = this.getMobileOperatingSystem()

        this.checkOldUser().then(() => {
            this.checkHasSSOToken().then(() => {
                this.checkLogin()
            })
        })
    },
    methods: {
        loadSSOJs() {
            if (document.getElementById('sso-script')) {
                let parent = document.getElementsByTagName('body')[0];
                let child = document.getElementById('sso-script');
                parent.removeChild(child)
            }
            let s = document.createElement('script');
            s.type = "text/javascript";
            // s.src = SUNTEC_CONFIG.SSO_JS_URL;
            s.src = "/static/js/sso.js"
            s.id = "sso-script";
            document.getElementsByTagName("body")[0].appendChild(s);
        },
        checkOldUser: async function() {
            let currentUserStorage = JSON.parse(
                localStorage.getItem("currentUser")
            )
            if (currentUserStorage) {
                this.$store.dispatch("userLogin", currentUserStorage)
            }
        },
        checkLogin: function() {
            let oldAccessToken = this.$cookies.get("access_token");
            if (!oldAccessToken) {
                this.guestLogin()
            } else {
                let _this = this
                let indexUser = Math.floor(1000 + Math.random() * 90000)

                this.$http.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${oldAccessToken}`

                this.$http
                    .post(SDK_API.CHECK_LOGIN, {
                        deviceUdid: `web-client-${indexUser}`,
                        deviceType: parseInt(DEVICE_TYPES.WEB),
                    })
                    .then(function(response) {
                        if (response.data.code === STATUS_RESPONSES.SUCCESS) {
                            if (response.data.data) {
                                _this.$store.dispatch(
                                    "userLogin",
                                    response.data.data
                                )
                            } else {
                                _this.$router.push({ name: "Home" });
                                _this.$cookies.remove("guest_token");
                                _this.guestLogin()
                            }
                            _this.webLoaded = true
                        } else if (
                            response.data.code ===
                            STATUS_RESPONSES.USER_LOGGED_ANOTHER_DEVICE
                        ) {
                            _this.$router.push({ name: "Home" });
                            _this.$toastr.e(
                                response.data.message,
                                STATUS_MESSAGES.ERROR
                            )
                            _this.$cookies.remove("guest_token");
                            _this.guestLogin()
                        } else {
                            _this.$toastr.e(
                                response.data.message,
                                STATUS_MESSAGES.ERROR
                            )
                            _this.$cookies.remove("guest_token")
                            _this.guestLogin()
                        }
                    })
                    .catch(function(error) {
                        console.log(error)
                    })
                    .then(function() {})
            }
        },
        updateKeyRouter: function() {
            this.keyRouter++
        },
        renderViewUpdate: function(route) {
            if (route === "Home" || route === "Category")
                return route + "_" + this.keyRouter
            return route
        },
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onResize)
    },
}
</script>

<style lang="scss">
@import "assets/scss/style";
</style>
