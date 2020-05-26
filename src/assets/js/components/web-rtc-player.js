import WssPlayMixin from "../../../mixins/WssPlayMixin";

export default {
	name: "WebRtcPlayer",
	components: {},
	mixins: [WssPlayMixin],
	props: {
		playerWrapper: {
			type: String,
			default: "remoteVideo"
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
				return {
					applicationName: "live",
					streamName: null,
					sessionId: "[empty]"
				};
			}
		},
	},
	data() {
		return {
			maxNumberTryPlay: 5,
			repeaterRetryPlay: 0,
		};
	},
	watch: {},
	computed: {},
	created() {
	},
	mounted() {
		let _this = this;
		// Host start share screen:
		this.$root.$on('trigger-play-video', function(){
			setTimeout(function () {
				_this.triggerAutoPlay();
			}, 4000)
		});

		this.initRemoteVideo();
		this.startPlay();
		this.$nextTick(function () {
			setTimeout(function () {
				_this.triggerAutoPlay();
			}, 4000)
		});
	},
	methods: {
		triggerAutoPlay: function () {
			let _this = this;
			// repeater stream not ready
			if (_this.repeaterRetryPlay <= _this.maxNumberTryPlay) {
				let vid = document.getElementById(_this.playerWrapper);
				if (vid) {
					try {
						vid.play();
					} catch (e) {
						if (_this.repeaterRetryPlay <= _this.maxNumberTryPlay) {
							_this.repeaterRetryPlay++;
							_this.triggerAutoPlay();
						}
					}
					_this.repeaterRetryPlay++;
				}
			}
		}
	}
};
