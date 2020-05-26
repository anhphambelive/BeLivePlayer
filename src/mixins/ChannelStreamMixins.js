import { SDK_API } from "../configs/APIs";
import { STATUS_REMOTE_STREAM, STATUS_VIDEO } from "../configs/SDK";
import { STATUS_MESSAGES, SYSTEM_MESSAGES } from "../messages/System";
import { mapGetters } from "vuex";
import { ALLOW_CHAT_ON_RECORDED_VIDEO, ALLOW_GUEST_CHAT, SUNTEC_CONFIG } from "../configs/Settings";

export default {
    name: "ChannelStreamMixins",
    data() {
        return {
            promoModalTitle: "Promo Code",
            promoModalId: "copy-promo-modal",
            sharingModalTitle: "Share this livestream",
            sharingModalId: "sharing-stream-modal",
            isLikeClicked: false
        };
    },
    computed: {
        ...mapGetters(["user", "channelStream", "isKickedUser"]),
        urlSharingStream: function () {
            if (this.channelStream) {
                return this.channelStream.webStreamUrl;
                // return `${BELIVESDK_WEB_APP_BASE_URL}/watch/${this.channelStream.slug}`;
            }
            return null;
        },
        requiredLoginSignUpPopUp: function () {
            if (ALLOW_GUEST_CHAT || (this.user && this.user.userId)) {
                return false;
            }
            else {
                return true;
            }
        },
        hasPermissionChatOnRecordedVideo: function () {
            if (this.channelStream && this.channelStream.status === STATUS_VIDEO.RECORDED)
                return ALLOW_CHAT_ON_RECORDED_VIDEO;

            return true;
        },
    },
    watch: {},
    created() {
    },
    mounted() {
        this.$root.$on("reset-state-like-clicked", () => {
            this.isLikeClicked = false;
        });
    },
    methods: {
        getProductsInStream: function () {
            let _this = this;
            _this.$http.post(SDK_API.GET_PRODUCTS_IN_STREAM, {
                slug: _this.channelStream.slug
            })
                .then(response => {
                    if (response.data.data) {
                        _this.$store.dispatch("updateStreamProducts", response.data.data ? response.data.data : []);
                        _this.afterGetProductsInStreamSuccess();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    _this.$toastr.e(SYSTEM_MESSAGES.CONTACT_ADMIN, STATUS_MESSAGES.ERROR);
                    _this.statusLiveStream = STATUS_REMOTE_STREAM.STOPPED;
                })
                .then(() => {
                });
        },
        afterGetProductsInStreamSuccess: function () { },
        showSharingStreamModal: function () {
            this.$bvModal.show(this.sharingModalId)
        },
        showPromoCode: function () {
            this.$bvModal.show(this.promoModalId)
        },
        openShop: function () {
            this.getProductsInStream();
        },
        handleParseUrl(url) {
            let ssoInfo = this.$cookies.get("ssoInfo")
            if (!ssoInfo) return null;
            let template = SUNTEC_CONFIG.SUNTEC_PRODUCT_TEMPLATE;
            let isLive = this.channelStream ? 1 : 0;
            template = template.replace("<token>", ssoInfo.token).replace("<productUrl>", url).replace("<referrerUrl>", window.location.origin).replace("<isLive>", isLive).replace("<durationLeft>", "20");
            //window.open(template, "_blank");
            return template;
        },
        visitShopWebsite: function () {
            if (this.channelStream.cartUrl) {
                let url = this.handleParseUrl(this.channelStream.cartUrl);
                if (url) window.open(url, '_blank');
            }
        }
    }
};
