import ChatMixins from "../../../mixins/ChatMixins";
import Heart from "../../../components/animations/Heart"
import { STATUS_MESSAGES, SYSTEM_MESSAGES } from "../../../messages/System";
import { STATUS_REMOTE_STREAM, STATUS_RESPONSES } from "../../../configs/SDK";
import { SDK_API } from "../../../configs/APIs";
import { mapGetters } from "vuex";
import { RTM_MESSAGE_TYPE, RTM_MESSAGES } from "../../../configs/RTM_SDK";
import ChannelStreamMixins from "../../../mixins/ChannelStreamMixins";

export default {
    name: "ChatBox",
    components: { Heart },
    mixins: [ChatMixins, ChannelStreamMixins],
    props: {
        listUserCurrentJoin: {
            type: Array / Object,
            default: function () {
                return [];
            }
        },
    },
    
    data() {
        return {
        };
    },
    computed: {
        ...mapGetters(["channelStream", "streamStatistic", "isShowStreamProducts", "streamProducts", "isKickedUser"]),
    },
    created() {
    },
    mounted() {
        try {
            window.reloadSuntecAuthELements();
        } catch (e) {
            console.log("Error reload suntec auth", e);
        }
    
        let _this = this;
		/**
		 * Listener Like action:
		 */
        this.$root.$on('send-like-stream', function (data) {
            _this.sendLikeStream(data);
        });
    },
    watch: {

    },
    methods: {
        clickLikeStream: function(isLike) {
            this.sendLikeStream({
                isLike: isLike,
                isLikeClicked: this.isLikeClicked
            });
            this.isLikeClicked = true;
        },
        afterGetProductsInStreamSuccess: function () {
            this.$store.dispatch("updateStateListStreamProducts", !this.isShowStreamProducts);
        },
        sendChannelMessageAction: function (message) {
            this.sendChannelMessage(message);
        },
    }
}
