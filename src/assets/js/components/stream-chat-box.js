import ChatMixins from "../../../mixins/ChatMixins";
import { LAYOUT_CHAT_BOX_MODES } from "../../../configs/SDK";
import {mapGetters} from "vuex";
import {RTM_MESSAGE_TYPE, STATUS_MEMBER} from "../../../configs/RTM_SDK";

export default {
	name: "StreamChatBox",
	mixins: [ChatMixins],
	data() {
		return {
			currentLayout: LAYOUT_CHAT_BOX_MODES.CHAT,
			chatBoxLayouts: LAYOUT_CHAT_BOX_MODES,
			statusMember: STATUS_MEMBER,
		};
	},
	props: {
		streamStatistic: {
			type: Object,
			default: null
		},
		isWaitingScreen: {
			type: Boolean,
			default: false
		},
		isLockedRoom: {
			type: Boolean,
			default: false
		},
		channelChatMode: {
			type: Number,
			default: RTM_MESSAGE_TYPE.CUSTOM_GROUPMODE_ABLECHAT
		}
	},
	computed: {
	    ...mapGetters(['user'])
    },
	watch: {},
	mounted() {
	},
	methods: {
		switchLayoutChatBox: function (layoutMode) {
			this.currentLayout = layoutMode;
		}
	}
};
