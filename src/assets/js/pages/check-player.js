import VideoJsPlayer from "../../../components/VideoJsPlayer";
import WebRtcPlayer from "../../../components/WebRtcPlayer";
import PlyrPlayer from "../../../components/PlyrPlayer";
import HelperMixins from "../../../mixins/HelperMixins";

export default {
	name: "CheckPlayer",
	mixins: [HelperMixins],
	components: {
		VideoJsPlayer,
		WebRtcPlayer,
		PlyrPlayer,
	},
	data() {
		return {
			showLoading: false,
			videoJsPlayerOptions: {
				// coverImage: null,
				// userImage: null,
				// urlSource: null,
			},
			reRenderComponent: 0,
			streamUrl: "",
			usePlayer: "videojs",
			playerOptions: [
				{ value: "videojs", text: "VideoJS Player" },
				{ value: "hls", text: "HLS Player" },
				{ value: "shaka", text: "Shaka Player" }
			],
		};
	},
	computed: {
	},
	watch: {
	
	},
	created() {
	},
	mounted() {
	
	},
	methods: {
		startPlayVideo: function (url) {
			// this.showLoading = true;
			this.reRenderComponent++;
			if (this.usePlayer === "videojs") {
				this.videoJsPlayerOptions = Object.assign({}, {
					urlSource: url
				});
			}
		}
	},
};