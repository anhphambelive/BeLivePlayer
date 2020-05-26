import LiveVideoBox from "../../../components/LiveVideoBox";
import ViewerMixins from "../../../mixins/ViewerMixins";
import VideoJsPlayer from "../../../components/VideoJsPlayer";
import WebRtcPlayer from "../../../components/WebRtcPlayer";
import PlyrPlayer from "../../../components/PlyrPlayer";
// import ConfirmSignInModal from "../../../components/ConfirmSignInModal"
import TextModal from "../../../components/TextModal"
import EndScreenStream from "../../../components/EndScreenStream"

import {mapGetters} from "vuex";
import HelperMixins from "../../../mixins/HelperMixins";

export default {
	name: "WatchStream",
	mixins: [ViewerMixins, HelperMixins],
	components: {
		LiveVideoBox,
		VideoJsPlayer,
		WebRtcPlayer,
		PlyrPlayer,
		TextModal,
		// ConfirmSignInModal,
		EndScreenStream
	},
	data() {
		return {
		};
	},
	computed: {
		...mapGetters(["isMobileLayout", "isKickedUser"])
	},
	watch: {
	
	},
	created() {
	},
	mounted() {
		this.$root.$on("onExit", () => {
			if (this.$route.name === "Home") {
				window.location.reload();
			}
			else {
				this.$router.push({ name: "Home" });
			}
		});
	},
	methods: {
		afterGetDataVideoSuccess: function () {
			// Share screen:
			this.isSharingScreen = true;
		},
	},
};