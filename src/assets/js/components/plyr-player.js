import Plyr from "plyr";

export default {
	name: "PlyrPlayer",
	components: {},
	mixins: [],
	props: {
		playerWrapper: {
			type: String,
			default: "remoteVideo"
		},
		urlSource: {
			type: String,
			default: null
		},
		poster: {
			type: String,
			default: ""
		},
		isShowControl: {
			type: Boolean,
			default: true
		},
		isMuteAudio: {
			type: Boolean,
			default: false
		},
		streamInfo: {
			type: Object,
			default: function () {
				return {}
			}
		},
		options: {
			type: Object,
			default() {
				return {
					autoplay: true,
					muted: true,
					disableContextMenu: true,
					fullscreen: {
						enabled: true,
						fallback: true,
						iosNative: true,
						container: null
					},
					// controls: [
					// 	'play-large',
					// 	'play',
					// 	'progress',
					// 	'current-time',
					// 	'mute',
					// 	'volume',
					// 	// 'captions',
					// 	'settings',
					// 	// 'pip',
					// 	// 'airplay',
					// 	'fullscreen'
					// ],
				};
			}
		},
		isPlayStream: {
			type: Boolean,
			default: false
		},
		usePlayer: {
			type: String,
			default: null
		}
	},
	data() {
		return {
			maxNumberTryPlay: 5,
			repeaterRetryPlay: 0,
			plyrPlayer: null,
			videoElement: null,
		};
	},
	watch: {},
	computed: {},
	created() {
	},
	mounted() {
		this.videoElement = document.getElementById(this.playerWrapper);
		
		if (this.isPlayStream) { // Play Stream
			this.playStreamVideo();
		}
		else {
			this.playVideoRecorded();
		}
		
		this.plyrPlayer.on('play', () => {
			this.$root.$emit('played-video-player');
		});
		
	},
	methods: {
		playStreamVideo: function () {
			let _this = this;
			this.plyrPlayer = new Plyr(_this.videoElement, _this.options);
			this.plyrPlayer.on('ready', event => {
				if (_this.streamInfo) {
					_this.$root.$emit(`on-status-stream`, {
						channel: _this.streamInfo.streamName,
						status: true
					});
				}
				_this.renderPlayer();
				
				setTimeout(() => {
					_this.plyrPlayer.play();
				}, 1000);
			});
		},
		renderPlayer: function () {
			let isBrowserSupported = true;
			if (!this.usePlayer) {
				if (Hls.isSupported()) {
					// For more Hls.js options, see https://github.com/dailymotion/hls.js
					const hls = new Hls();
					hls.loadSource(this.urlSource);
					hls.attachMedia(this.videoElement);
				} else if (shaka.Player.isBrowserSupported()) {
					// Install built-in polyfills
					shaka.polyfill.installAll();
					const shakaInstance = new shaka.Player(this.videoElement);
					shakaInstance.load(this.urlSource);
				} else {
					isBrowserSupported = true;
				}
			}
			else if (this.usePlayer === "hls") {
				if (Hls.isSupported()) {
					// For more Hls.js options, see https://github.com/dailymotion/hls.js
					const hls = new Hls();
					hls.loadSource(this.urlSource);
					hls.attachMedia(this.videoElement);
				} else {
					isBrowserSupported = true;
				}
			}
			else if (this.usePlayer === "shaka") {
				if (shaka.Player.isBrowserSupported()) {
					// Install built-in polyfills
					shaka.polyfill.installAll();
					const shakaInstance = new shaka.Player(this.videoElement);
					shakaInstance.load(this.urlSource);
				}
				else {
					isBrowserSupported = true;
				}
			}
			
			if (!isBrowserSupported) {
				this.videoElement.src = this.urlSource;
				console.warn('Browser is not supported!');
			}
		},
		playVideoRecorded: function () {
			let _this = this;
			this.plyrPlayer = new Plyr(_this.videoElement, Object.assign(_this.options, {
				urls: _this.urlSource
			}));
			this.plyrPlayer.on('ready', event => {
				setTimeout(() => {
					_this.plyrPlayer.play();
				}, 1000);
			});
		}
	},
	beforeDestroy() {
		if (this.plyrPlayer) {
			this.plyrPlayer.destroy();
		}
	}
};
