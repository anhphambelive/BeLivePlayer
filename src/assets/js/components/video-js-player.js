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
					// controlBar: {
					// 	playToggle: false,
					// 	captionsButton: false,
					// 	chaptersButton: false,
					// 	subtitlesButton: false,
					// 	remainingTimeDisplay: false,
					// 	progressControl: {
					// 		seekBar: true
					// 	},
					// 	fullscreenToggle: true,
					// 	playbackRateMenuButton: false,
					// 	pictureInPictureToggle: false,
					// },
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
			retryNumber: 0,
			qualityLevels: null
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
		
		this.player.on('ready', () => {
			this.player.on('error', (e) => {
				console.log("error player", e);
				_this.$root.$emit(`reset-video-js`);
			});
			
			this.player.reloadSourceOnError({
				// getSource allows you to override the source object used when an error occurs
				getSource: function(reload) {
					console.log('Reloading because of an error');
					// call reload() with a fresh source object
					// you can do this step asynchronously if you want (but the error dialog will
					// show up while you're waiting)
					reload({
						src: _this.videoJsPlayerOptions.urlSource,
						type: _this.typeVideo
					});
				},
			});

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
		});
	},
	methods: {
		initialPlayer: async function (number) {
			console.log("Retry number", number);
			try {
				this.player = videojs(
					this.$refs.videoPlayer,
					this.options,
				);
				this.qualityLevels = this.player.qualityLevels();
				console.log("qualityLevels", this.qualityLevels);
				
				// Listen to change events for when the player selects a new quality level
				this.qualityLevels.on('change', () => {
					console.log('Quality Level changed!');
					console.log('New level:', this.qualityLevels[this.qualityLevels.selectedIndex]);
				});
				
				this.player.hlsQualitySelector({
					displayCurrentQuality: true,
				});
			} catch (e) {
				console.log("Error", e);
			}
			
		},
		destroyPlayer: function () {
			// this.player.dispose();
			// this.player = null;
		},
		changeQuality(quality, index) {
			this.qualityLevels.selectedIndex_ = index;
			this.qualityLevels[index].enabled = true;
			for (let i = 0; i < this.qualityLevels.length; i++) {
				let qualityLevel = this.qualityLevels[i];
				if (i !== index) {
					qualityLevel.enabled = false;
				} else {
					qualityLevel.enabled = true;
				}
			}
			console.log("changed", this.qualityLevels);
		},
		registerButton() {
			/* ADD PREVIOUS */
			let Button = videojs.getComponent('Button');

			// Extend default
			let PrevButton = videojs.extend(Button, {
				//constructor: function(player, options) {
				constructor: function() {
					Button.apply(this, arguments);
					this.addClass('vjs-icon-cog');
					this.controlText("Quality");
					this.toggleClass("open", true);
					// this.width("50");
				},
				
				// constructor: function() {
				//   Button.apply(this, arguments);
				//   this.addClass('vjs-play-control vjs-control vjs-button vjs-paused');
				// },
				
				createEl: function() {
				  return Button.prototype.createEl('button', {
				    className: 'vjs-quality-button',
				    innerHTML: ' Quality'
				  });
				},
				
				handleClick: function() {
					console.log('click');
				},
				
				toggleClass: function() {
					console.log('toggleClass');
					return Button.prototype.toggleClass('open-source');
				}
			});
			
			// Register the new component
			videojs.registerComponent('PrevButton', PrevButton);
			this.player.getChild('controlBar').addChild('PrevButton', {}, 0);
		}
	},
	beforeDestroy() {
		if (this.player) {
			this.player.dispose();
			this.player = null;
		}
	}
};
