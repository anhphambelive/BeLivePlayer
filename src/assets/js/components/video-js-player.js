import videojs from "video.js";

export default {
	name: "VideoJsPlayer",
	props: {
		videoJsPlayerOptions: {
			type: Object,
			default: function () {
				return {
					// coverImage: null,
					// urlSource: null,
					// userImage: null,
				}
			}
		},
		streamInfo: {
			type: Object,
			default: function () {
				return {}
			}
		},
		playerWrapper: {
			type: String,
			default: "my-video"
		},
		options: {
			type: Object,
			default() {
				return {
					autoplay: true,
					preload: "auto",
					controlBar: {
						playToggle: false,
						captionsButton: false,
						chaptersButton: false,
						subtitlesButton: false,
						remainingTimeDisplay: false,
						progressControl: {
							seekBar: true
						},
						fullscreenToggle: false,
						playbackRateMenuButton: false,
						pictureInPictureToggle: false,
					},
					controls: true,
					liveui: true
					// muted: true
				};
			}
		}
	},
	data() {
		return {
			player: null,
			retryNumber: 0
		};
	},
	watch: {

	},
	computed: {
		imgCover: function () {
			return this.videoJsPlayerOptions.coverImage
				? this.videoJsPlayerOptions.coverImage
				: this.videoJsPlayerOptions.userImage
					? this.videoJsPlayerOptions.userImage
					: "";
		},
		typeVideo: function () {
			if (!this.videoJsPlayerOptions.urlSource)
				return "";
				
			let extension = this.videoJsPlayerOptions.urlSource.split(".").pop();
			if (extension === "mp4") {
				return "video/mp4";
			} else if (extension === "m3u8") {
				return "application/x-mpegURL";
			} else if (extension === "webm") {
				return "video/webm";
			}
		}
	},
	mounted() {
		let _this = this;
		this.initialPlayer(this.retryNumber);
		
		// Handle event
		this.$root.$on('un-mute-video', function(){
			_this.player.muted(false);
		});
		
		// this.$root.$on('host-end-stream', function(){
		// 	if (_this.player) {
		// 		_this.player.dispose();
		// 	}
		// });
		
		this.player.on('timeupdate', function() {
			_this.$root.$emit('update-time-video-player',this.currentTime());
		});
		
		this.player.on('play', function() {
			_this.$root.$emit('played-video-player');
		});
		
		this.player.on('ended', function() {
			_this.$root.$emit('host-end-stream');
			this.dispose();
		});
	},
	methods: {
		initialPlayer: async function (number) {
			console.log("Retry number", number);
			let _this = this;
			let vid = document.getElementById(_this.playerWrapper);
			// let btnUnmute = document.getElementById("unmute-stream-init-btn");
			try {
				this.player = videojs(
					this.$refs.videoPlayer,
					this.options,
					function onPlayerReady() {
						console.log("onPlayerReady", this);
						// setTimeout(() => {
						// 	try {
						// 		// btnUnmute.click();
						// 		vid.play();
						// 	} catch (e) {
						// 		console.log(e)
						// 	}
						// }, 2000);
						// Update status:
						if (_this.streamInfo) {
							_this.$root.$emit(`on-status-stream`, {
								channel: _this.streamInfo.streamName,
								status: true
							});
						}
						
						_this.$root.$emit(`played-video`);
						
						this.on('error', function(e) {
							_this.destroyPlayer();
							console.log("reset-video-js");
							_this.$root.$emit(`reset-video-js`);
						});
					},
				);
			} catch (e) {
				console.log("Error", e);
			}
			
		},
		destroyPlayer: function () {
			// this.player.dispose();
			// this.player = null;
		}
	},
	beforeDestroy() {
		if (this.player) {
			this.player.dispose();
		}
	}
};
