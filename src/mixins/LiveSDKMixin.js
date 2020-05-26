import {SDK_API} from "../configs/APIs";
import {STATUS_REMOTE_STREAM, STATUS_RESPONSES, STATUS_VIDEO} from "../configs/SDK";
import {mapGetters} from "vuex";

export default {
	name: "LiveSDKMixin",
	data() {
		return {
			endResultStream: {
				DurationTime: 0,
				TotalLikes: 0,
				TotalReceivedStars: 0,
				TotalViewers: 0
			},
			intervalGetStatisticStreamId: null,
			timeIntervalGetStatisticStream: 30000,
			timeStreaming: 0,
			intervalIncreaseTimeStreamingId: null,
			timeIntervalIncreaseTimeStream: 1000, // 1 seconds
			statusLiveStream: STATUS_REMOTE_STREAM.NEW
		};
	},
	computed: {
		...mapGetters(["channelStream", "streamStatistic"]),
	},
	watch: {},
	created() {
	},
	mounted() {
	},
	methods: {
		createIntervalPingServer: function () {
			// Ping server live:
			let _this = this;
			this.intervalGetStatisticStreamId = setInterval(function () {
				if (
					_this.statusLiveStream === STATUS_REMOTE_STREAM.PLAYING ||
					_this.statusLiveStream === STATUS_REMOTE_STREAM.STREAMING
				)
					_this.pingStatisticStream();
			}, _this.timeIntervalGetStatisticStream);
		},
		pingStatisticStream: function () {
			let _this = this;
			let streamData = {
				slug: this.channelStream.slug
			};
			this.$http
				.post(SDK_API.GET_STATISTIC_STREAM, streamData)
				.then(response => {
					if (response.data.code === STATUS_RESPONSES.SUCCESS) {
						// success get statistic stream
						if (response.data.data.status === STATUS_VIDEO.RECORDED) {
							_this.clearIntervalPingServer();
							_this.clearIntervalStartTimeStream();
							_this.updateDataEndStream(response.data.data);
							// Stream ended
							_this.statusLiveStream = STATUS_REMOTE_STREAM.END;
							_this.videoJsPlayerOptions = {};
						}
						this.updateStatisticStream(response.data.data);
					}
				});
		},
		clearIntervalPingServer: function () {
			clearInterval(this.intervalGetStatisticStreamId);
			this.intervalGetStatisticStreamId = null;
		},
		updateStatisticStream: function (data) {
			this.$store.dispatch("updateStreamStatistic", {
				TotalReceivedStars: parseInt(data.totalGold) ? parseInt(data.totalGold) : 0,
				DurationTime: parseInt(data.duration) ? parseInt(data.duration) : 0,
				TotalLikes: parseInt(data.likeCount) ? parseInt(data.likeCount) : 0,
				TotalViewers: parseInt(data.viewCount) ? parseInt(data.viewCount) : 0,
			});
			this.handleAfterUpdateStatisticStream();
		},

		handleAfterUpdateStatisticStream: function(){},

		startTimeStream: function () {
			let _this = this;
			// Time up:
			this.intervalIncreaseTimeStreamingId = setInterval(function () {
				if (_this.isStreaming) _this.timeStreaming++;
			}, _this.timeIntervalIncreaseTimeStream);
		},
		clearIntervalStartTimeStream: function () {
			clearInterval(this.intervalIncreaseTimeStreamingId);
			this.intervalIncreaseTimeStreamingId = null;
		},
		updateDataEndStream: function (data) {
			this.endResultStream = {
				DurationTime: data.duration,
				TotalLikes: data.likeCount,
				TotalReceivedStars: data.totalGold,
				TotalViewers: data.viewCount
			};
		},
		updateEndResultStream: function () {
			let streamData = {
				slug: this.channelStream.slug
			};
			let _this = this;
			this.$http
				.post(SDK_API.GET_STATISTIC_STREAM, streamData)
				.then(response => {
					if (response.data.code === STATUS_RESPONSES.SUCCESS) {
						// success get statistic stream
						_this.updateDataEndStream(response.data.data);
						if (response.data.data.status === STATUS_VIDEO.RECORDED) {
							// Stream ended
							_this.statusLiveStream = STATUS_REMOTE_STREAM.END;
							_this.videoJsPlayerOptions = {};
						}
					}
				});
		}
	},
    /**
     *
     * @returns {Promise<void>}
     */
    async beforeDestroy() {
        console.log('Remove LiveSDK');
        await this.clearIntervalPingServer();
        await this.clearIntervalStartTimeStream();
    }
};
