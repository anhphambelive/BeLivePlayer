import {mapGetters} from "vuex";
import {SDK_API} from "../../../configs/APIs";
import {STATUS_RESPONSES} from "../../../configs/SDK";
import SdkMixins from "../../../mixins/SdkMixins";
import {IS_USE_SDK, ROUTES_NEED_AUT} from "../../../configs/Settings";
export default {
	name: "Navbar",
	mixins: [SdkMixins],
	props: {},
	data() {
		return {
			currentRouteName: this.$route.name,
			isUseSDK: IS_USE_SDK
		};
	},
	computed: {
		...mapGetters(["user"]),
	},
	created() {
	},
	mounted() {
	},
	methods: {
		updateKeyRoute: function () {
			this.$emit("update-key-route");
		},
        logoutUser: function () {
		    let _this = this;
            this.$http.post(SDK_API.LOGOUT).then(response => { // logout API
                if (response.data.code === STATUS_RESPONSES.SUCCESS) { // success get data
					_this.$cookies.remove("guest_token");
                    _this.guestLogin().then(() => {
                    	switch (_this.currentRouteName) {
							case ROUTES_NEED_AUT.PROFILE:
							case ROUTES_NEED_AUT.LIBRARY:
							case ROUTES_NEED_AUT.ANALYTICS:
							case ROUTES_NEED_AUT.ANALYTIC_STREAM:
							case ROUTES_NEED_AUT.LIVE_SDK:
							case ROUTES_NEED_AUT.LIVE_AGORA: {
								_this.$router.push({name: "Home"});
								break;
							}
							
							default: {
								window.location.reload();
								break;
							}
                    	}
					});
                }
                else {
                    this.$toastr.e(response.data.message, "Error Logout");
                    _this.messageError = response.data.message;
                }
            }, (err) => {
                this.$toastr.e(err.response.data.message, "Error Logout");
                _this.messageError = err.response.data.message;
            });
        },
	}
};
