export default {
	name: "WowzaPlayer",
	components: {},
	mixins: [],
	props: {
		playerWrapper: {
			type: String,
			default: "playerElement"
		},
		options: {
			type: Object,
			default: function () {
				return {
					license: "",
					sources: [
						{
							sourceURL:
								"https://belivesdk-streaming.belive.sg/liveedge/1234567890aqwertyuio/playlist.m3u8"
						}
					],
					title: "",
					description: "",
					autoPlay: false,
					mute: false,
					volume: 75
				};
			}
		}
	},
	data() {
		return {};
	},
	watch: {},
	computed: {},
	created() {
	},
	mounted() {
		window.WowzaPlayerLibs.create(this.playerWrapper, this.options);
	},
	methods: {}
};
