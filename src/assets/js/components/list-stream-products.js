import { mapGetters } from "vuex";
import HelperMixins from "../../../mixins/HelperMixins";
import { SUNTEC_CONFIG } from "../../../configs/Settings"

export default {
    name: "ListStreamProducts",
    components: {},
    mixins: [HelperMixins],
    props: {
        videoElementId: {
            type: String,
            default: "my-watch-video"
        }
    },
    data() {
        return {
            currencySymbol: "S$",
            updateDimensionKey: 0
        };
    },
    watch: {},
    computed: {
        ...mapGetters(["streamProducts", "isShowStreamProducts", "isMobileLayout"]),
        videoWidthDimension: function () {
            if (this.updateDimensionKey && !this.isMobileLayout) {
                let videoDimension = this.getCurrentVideoDimension();
                if (videoDimension) {
                    return `${videoDimension.width}px`;
                }
            }
            return '100%';
        }
    },
    created() {
    },
    mounted() {
        /**
         * Play video
         */
        this.$root.$on('update-time-video-player', () => {
            this.onResize();
        });
    
        /**
         * Resize browser
         */
        this.$root.$on('resize-browser', (isMobileSizeLayout) => {
            this.updateDimensionKey++;
        });
    },
    methods: {
        closeListStreamProduct: function () {
            this.$store.dispatch("updateStateListStreamProducts", false);
        },
        handleGoToProductUrl(productUrl) {
            let ssoInfo = this.$cookies.get("ssoInfo")
            if (!ssoInfo) return;
            let template = SUNTEC_CONFIG.SUNTEC_PRODUCT_TEMPLATE;
            template = template.replace("<token>", ssoInfo.token).replace("<productUrl>", productUrl).replace("<referrerUrl>", window.location.origin).replace("<isLive>", this.isStartedLive ? 1 : 0).replace("<durationLeft>", "20");
            return template;
        },
        getCurrentVideoDimension: function () {
            let video = $(`#${this.videoElementId} video`).get()[0];
            if (!video) {
                return null;
            }
            let videoRatio = video.videoWidth / video.videoHeight;
            // The width and height of the video element
            let width = video.offsetWidth, height = video.offsetHeight;
            // The ratio of the element's width to its height
            let elementRatio = width/height;
            // If the video element is short and wide
            if(elementRatio > videoRatio) {
                width = height * videoRatio + 5;
            }
            // It must be tall and thin, or exactly equal to the original ratio
            else {
                height = width / videoRatio;
            }
            return {
                width: width,
                height: height
            }
        }
    }
};
