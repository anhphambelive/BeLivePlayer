import ChatBox from "../../../components/ChatBox";
import Heart from "../../../components/animations/Heart";
import HostInfoCard from "../../../components/HostInfoCard";
import CopyClipboardModal from "../../../components/CopyClipboardModal";
import ListStreamProducts from "../../../components/ListStreamProducts";
import { STATUS_REMOTE_STREAM } from "../../../configs/SDK";
import { mapGetters } from "vuex";
import ChannelStreamMixins from "../../../mixins/ChannelStreamMixins";

export default {
    name: "LiveVideoBox",
    mixins: [ChannelStreamMixins],
    props: {
        isMobileLayout: {
            type: Boolean,
            default: false
        },
        hostStreamInfo: {
            type: Object,
            default: function () {
                return null;
            }
        },
        listUserCurrentJoin: {
            type: Array / Object,
            default: function () {
                return [];
            }
        },
        listChannelMessages: {
            type: Array / Object,
            default: function () {
                return [];
            }
        },
        listLikedAnimations: {
            type: Array / Object,
            default: function () {
                return [];
            }
        },
        statusLiveStream: {
            type: String,
            default: STATUS_REMOTE_STREAM.NEW
        },
    },
    components: {
        ChatBox,
        HostInfoCard,
        ListStreamProducts,
        CopyClipboardModal,
        Heart
    },
    data() {
        return {
            statusLiveStreamConfigs: STATUS_REMOTE_STREAM,
            isHideUnMuteFeature: false,
            clickNumber: 0
        };
    },
    computed: {
        ...mapGetters(["channelStream", "streamStatistic", "isShowStreamProducts", "streamProducts"]),
    },
    watch: {

    },
    created() {
    },
    mounted() {
        try {
            window.reloadSuntecAuthELements();
        } catch (e) {
            console.log("Error reload suntec auth", e);
        }
    },
    methods: {
        handleChangeClassAttr() {
            if (this.statusLiveStream === this.statusLiveStreamConfigs.STREAMING) return;
            if (this.$refs.sideRightWrapper.className.indexOf('side-right-wrapper--playback') == -1)
                this.$refs.sideRightWrapper.className += ' side-right-wrapper--playback'
        },
        afterGetDataVideoSuccess: function () {
            // Share screen:
            this.isSharingScreen = true;
        },
        unMuteStream: function () {
            let videoStream = $(`video`).get()[0];
            if (videoStream !== undefined) {
                console.log("Volume :D");
                try {
                    videoStream.muted = false;
                    videoStream.volume = 0.5;
                    // this.clickNumber++;
                    // if (this.clickNumber >= 2) {
                    //     this.isHideUnMuteFeature = true;
                    // }
                    this.isHideUnMuteFeature = true;
                    this.$root.$emit(`un-mute-video`)
                }
                catch (e) {
                    console.log(e);
                }
            }
        },
        clickLikeStream: function (isLike) {
            this.$root.$emit(`send-like-stream`, {
                isLike: isLike,
                isLikeClicked: this.isLikeClicked
            });
            this.isLikeClicked = true;
        },
        enterLikeTransition: function (el, done) {
            el.remove();
        },
        afterGetProductsInStreamSuccess: function () {
            this.$store.dispatch("updateStateListStreamProducts", !this.isShowStreamProducts);
        }
    },
};
