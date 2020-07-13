import VideoJsPlayer from "../../../components/VideoJsPlayer";
import PlyrPlayer from "../../../components/PlyrPlayer";
import WowzaPlayer from "../../../components/WowzaPlayer";
import {WOWZA_PLAYER_CONFIGS} from "../../../configs/Settings";

export default {
	name: "CheckPlayer",
	mixins: [],
	components: {
		VideoJsPlayer,
		PlyrPlayer,
		WowzaPlayer
	},
	data() {
		return {
			showLoading: false,
			reRenderComponent: 0,
			streamUrl: "",
            urlSources: [],
			usePlayer: "videojs",
			playerOptions: [
				// { value: "videojs", text: "VideoJS Player" },
				// { value: "hls", text: "HLS Player" },
				// { value: "shaka", text: "Shaka Player" },
				// { value: "wowza", text: "Wowza Player" },

				{ value: "videojs", text: "Player 1" },
				{ value: "hls", text: "Player 2" },
                { value: "videojs-aws", text: "Player 3" },
                // // { value: "shaka", text: "Player 3" },
				// // { value: "wowza", text: "Player 4" },
			],
			testingUrls: [
                "/static/media/lcs15_rect.webm",
				"https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8",
				"https://56124c4c47e0.us-west-2.playback.live-video.net/api/video/v1/us-west-2.238231345362.channel.V08fLwnN7GgN.m3u8",
				"http://cdnapi.kaltura.com/p/1878761/sp/187876100/playManifest/entryId/1_usagz19w/flavorIds/1_5spqkazq,1_nslowvhp,1_boih5aji,1_qahc37ag/format/applehttp/protocol/http/a.m3u8",
				"https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8",
				"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
				// "http://34.84.215.47/BeLive_cam0.m3u8",
				// "http://34.84.215.47/BeLive_cam1.m3u8",
				// "http://34.84.215.47/BeLive_cam2.m3u8",
				// "http://34.84.215.47/BeLive_cam3.m3u8 ",
			],
			wowzaPlayerOptions: {
				license: WOWZA_PLAYER_CONFIGS.LICENSE,
				sources: [
					{
						sourceURL: "https://belivesdk-streaming.belive.sg/liveedge/1234567890aqwertyuio/playlist.m3u8"
					}
				],
				title: "",
				description: "",
				autoPlay: true,
				mute: false,
				volume: 75
			}
		};
	},
	computed: {
	},
	watch: {
	},
	created() {
	},
	mounted() {
		// Handle event
		this.$root.$on('played-video-player', () => {
			this.showLoading = false;
		});
	},
	methods: {
		startPlayVideo: function (url) {
			// this.showLoading = true;
			this.streamUrl = url;
			this.reRenderComponent++;
			if (this.usePlayer === "videojs") {
				this.urlSources = [
                    url
                ];
			}
			else if (this.usePlayer === "videojs-aws") {
				this.urlSources = [
                    url
                ];
			}
			else if (this.usePlayer === "wowza") {
				this.wowzaPlayerOptions = Object.assign({}, {
					license: WOWZA_PLAYER_CONFIGS.LICENSE,
					sources: [
						{
							sourceURL: url
						}
					],
					title: "",
					description: "",
					autoPlay: true,
					mute: false,
					volume: 75
				});
			}
			else {
				this.urlSources = [];
			}
		}
	},
};
