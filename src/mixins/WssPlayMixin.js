import {LIVE_SERVER} from "../configs/SDK";

export default {
	name: "WssPlayMixin",
	props: {
		playerWrapper: {
			type: String,
			default: "remoteVideo"
		},
		isShowControl: {
			type: Boolean,
			default: true
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
		}
	},
	data() {
		return {
			remoteVideo: null,
			peerConnection: null,
			peerConnectionConfig: {iceServers: []},
			wsURL: LIVE_SERVER.SDP_URL,
			wsConnection: null,
			userData: {param1: "value1"},
			repeaterRetryCount: 0,
			doGetAvailableStreams: false,
			maxNumberRetry: 20,
			remoteStream: null
		};
	},
	computed: {},
	watch: {},
	created() {
	},
	mounted() {
	},
	methods: {
		initRemoteVideo: function () {
			this.remoteVideo = document.getElementById(this.playerWrapper);
		},
		stopPlay: function () {
			if (this.peerConnection != null) this.peerConnection.close();
			this.peerConnection = null;

			if (this.wsConnection != null) this.wsConnection.close();
			this.wsConnection = null;

			this.remoteVideo.src = ""; // this seems like a chrome bug - if set to null it will make HTTP request

			// Update status:
			this.$root.$emit(`on-status-stream`, {
				channel: this.streamInfo.streamName,
				status: false
			});

			console.log("stopPlay");
		},
		gotIceCandidate: function (event) {
			if (event.candidate != null) {
				console.log(
					"gotIceCandidate: " + JSON.stringify({ice: event.candidate})
				);
			}
		},
		gotDescription: function (description) {
			console.log("gotDescription");
			let _this = this;
			this.peerConnection.setLocalDescription(
				description,
				function () {
					console.log("sendAnswer");
					_this.wsConnection.send(
						'{"direction":"play", "command":"sendResponse", "streamInfo":' +
						JSON.stringify(_this.streamInfo) +
						', "sdp":' +
						JSON.stringify(description) +
						', "userData":' +
						JSON.stringify(_this.userData) +
						"}"
					);
				},
				function () {
					console.log("set description error");
				}
			);
		},
		gotRemoteTrack: function (event) {
			let _this = this;
			console.log(
				"gotRemoteTrack: kind:" +
				event.track.kind +
				" stream:" +
				event.streams[0]
			);
			try {
				_this.remoteVideo.srcObject = event.streams[0];
			} catch (error) {
				_this.remoteVideo.src = window.URL.createObjectURL(event.streams[0]);
			}
		},
		gotRemoteStream: function (event) {
			let _this = this;
			this.remoteStream = event.stream;
			try {
				_this.remoteVideo.srcObject = this.remoteStream;
			} catch (error) {
				_this.remoteVideo.src = window.URL.createObjectURL(this.remoteStream);
			}
			
			// this.remoteStream.getTracks().forEach((track) => {
			// 	console.log("gotRemoteStream: " + track);
			// 	track.addEventListener('ended', () => {
			// 		alert("ended stream");
			// 	})
			// 	track.onended = function(event) {
			// 		alert("ended stream");
			// 	}
			// });
		},
		errorHandler: function (error) {
			console.log(error);
		},
		startPlay: function () {
			this.wsConnect(this.wsURL);
		},
		wsConnect: function (url) {
			this.wsConnection = new WebSocket(url);
			this.wsConnection.binaryType = "arraybuffer";

			let _this = this;
			this.wsConnection.onopen = function () {
				console.log("wsConnection.onopen");

				_this.peerConnection = new RTCPeerConnection(
					_this.peerConnectionConfig
				);
				_this.peerConnection.onicecandidate = _this.gotIceCandidate;

				_this.peerConnection.onaddstream = _this.gotRemoteStream;
				
				_this.peerConnection.oniceconnectionstatechange = function() {
					if(_this.peerConnection.iceConnectionState == 'disconnected') {
						console.log('Disconnected');
					}
				};
				
				console.log("wsURL: " + _this.wsURL);
				sendPlayGetOffer();
			};

			function sendPlayGetOffer() {
				console.log("sendPlayGetOffer: " + JSON.stringify(_this.streamInfo));
				_this.wsConnection.send(
					'{"direction":"play", "command":"getOffer", "streamInfo":' +
					JSON.stringify(_this.streamInfo) +
					', "userData":' +
					JSON.stringify(_this.userData) +
					"}"
				);
			}

			_this.wsConnection.onmessage = function (evt) {
				console.log("wsConnection.onmessage: " + evt.data);

				var msgJSON = JSON.parse(evt.data);

				var msgStatus = Number(msgJSON["status"]);
				var msgCommand = msgJSON["command"];

				if (msgStatus === 514 || msgStatus === 504 || msgStatus === 502) {
					// repeater stream not ready
					_this.repeaterRetryCount++;
					if (_this.repeaterRetryCount < _this.maxNumberRetry) {
						setTimeout(() => {
							_this.startPlay();
						}, 1000)
					} else {
						_this.stopPlay();
					}
				} else if (msgStatus !== 200) {
					_this.stopPlay();
				} else {
					var streamInfoResponse = msgJSON["streamInfo"];
					if (streamInfoResponse !== undefined) {
						_this.streamInfo.sessionId = streamInfoResponse.sessionId;
					}

					var sdpData = msgJSON["sdp"];
					if (sdpData !== undefined) {
						console.log("sdp: " + JSON.stringify(msgJSON["sdp"]));

						_this.peerConnection.setRemoteDescription(
							new RTCSessionDescription(msgJSON.sdp),
							function () {
								_this.peerConnection.createAnswer(
									_this.gotDescription,
									_this.errorHandler
								);
							},
							_this.errorHandler
						);
					}

					var iceCandidates = msgJSON["iceCandidates"];
					if (iceCandidates !== undefined) {
						for (var index in iceCandidates) {
							console.log(
								"iceCandidates: " + JSON.stringify(iceCandidates[index])
							);
							_this.peerConnection.addIceCandidate(
								new RTCIceCandidate(iceCandidates[index])
							);
						}
					}

					// Update status:
					_this.$root.$emit(`on-status-stream`, {
						channel: _this.streamInfo.streamName,
						status: true
					});
				}

				if ("sendResponse".localeCompare(msgCommand) == 0) {
					if (_this.wsConnection != null) _this.wsConnection.close();
					_this.wsConnection = null;
				}
				// now check for getAvailableResponse command to close the connection
				if ("getAvailableStreams".localeCompare(msgCommand) == 0) {
					_this.stopPlay();
				}
			};

			this.wsConnection.onclose = function () {
				console.log("wsConnection.onclose");
			};

			this.wsConnection.onerror = function (evt) {
				console.log("wsConnection.onerror: " + JSON.stringify(evt));
			};
		}
	},

	/**
	 *
	 * @returns {Promise<void>}
	 */
	async beforeDestroy() {
		console.log('Stop Stream');
		await this.stopPlay();
	}
};
