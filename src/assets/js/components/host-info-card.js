import {mapGetters} from "vuex";
import CopyClipboardModal from "../../../components/CopyClipboardModal"
import ChannelStreamMixins from "../../../mixins/ChannelStreamMixins";
export default {
	name: "HostInfoCard",
	mixins: [ChannelStreamMixins],
	components: {
		CopyClipboardModal
	},
	data() {
		return {
		
		};
	},
	props: {
		streamInfo: {
			type: Object,
			default: function () {
				return null;
			}
		},
		isMobileLayout: {
			type: Boolean,
			default: false
		},
	},
	computed: {
		...mapGetters(["channelStream", "streamStatistic"]),
	},
	watch: {},
	mounted() {
		try {
            window.reloadSuntecAuthELements();
        } catch (e) {
            console.log("Error reload suntec auth", e);
        };
	},
	methods: {
	
	}
};
