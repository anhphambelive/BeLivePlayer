import {SDK_API} from "../configs/APIs";
import {
	DEVICE_TYPES, MOBILE_OS,
	STATUS_REMOTE_STREAM,
	STATUS_RESPONSES, STATUS_VIDEO,
} from "../configs/SDK";
import {STATUS_MESSAGES, SYSTEM_MESSAGES} from "../messages/System";
import {mapGetters} from "vuex";
import HelperMixins from "./HelperMixins";
import LiveSDKMixin from "./LiveSDKMixin";
import SdkChatMixin from "./SdkChatMixin";
import ChannelStreamMixins from "./ChannelStreamMixins";

export default {
	name: "HostMixins",
	mixins: [LiveSDKMixin, SdkChatMixin, ChannelStreamMixins, HelperMixins],
	data() {
		return {
			streamInfo: {
				applicationName: "live",
				streamName: null,
				sessionId: "[empty]"
			},
			cameraInfo: {
				applicationName: "live",
				streamName: "camera-only",
				sessionId: "[empty]"
			},
			hostStreamInfo: null,
			remoteVideoCameraWrapper: "remoteVideoCamera",
			isWaitingScreen: false,
			showLoading: true,
			isLockedRoom: false,
			isSharingScreen: false,
			isSwitching: true,
			isConnectedSharingScreen: false,

			slugStream: (this.$route.name === "WatchStream") ? this.$route.params.slug : this.$route.params.title,
			channelKey: this.$route.params.channel_key,
			passwordStream: "",
			minLengthPasswordStream: 7,
			loadingPasswordModal: false,
			roomChatName: null,
			isLoading: false,
			videoJsPlayerOptions: {
				// coverImage: null,
				// userImage: null,
				// urlSource: null,
			},
			reRenderComponent: 0,
			videoJsPlayerSetupOptions: {
				autoplay: true,
				preload: "auto",
				playsinline: true,
				// liveui: true,
				controlBar: {
					playToggle: true,
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
				controls: false,
				muted: true
			},
			statusLiveStreamConfigs: STATUS_REMOTE_STREAM,
			statusVideoConfigs: STATUS_VIDEO.RECORDED,
			typeVideos: STATUS_VIDEO,
			deviceTypes: DEVICE_TYPES,

			intervalReloadDetailDataId: null,
			timeIntervalReload: 3000,
			viewerUsingMobileOS: MOBILE_OS.UN_KNOWN,
			isBrowserSupportRTC: true,
			textModalContent: "Your comment has been censored due to violation of terms"
		};
	},
	computed: {
		...mapGetters(["user", "channelStream"]),
		classStatusLiveStream: function () {
			switch (this.statusLiveStream) {
				case STATUS_REMOTE_STREAM.NEW:
					return "status-live-new";
				case STATUS_REMOTE_STREAM.STOPPED:
					return "status-live-stopped";
				case STATUS_REMOTE_STREAM.STREAMING:
					return "status-live-streaming";
				case STATUS_REMOTE_STREAM.PLAYING:
					return "status-live-playing";
				default:
					return "status-live-new";
			}
		},
		isLive: function () {
			if (this.channelStream && this.channelStream.status === 1 && this.statusLiveStream !== this.statusLiveStreamConfigs.STOPPED)
				return true;
			return false;
		},
		usePlayer: function () {
			if (this.channelStream && this.statusLiveStream !== this.statusLiveStreamConfigs.STOPPED) {
				if (this.viewerUsingMobileOS === MOBILE_OS.UN_KNOWN && (this.channelStream.publisher.deviceType === parseInt(DEVICE_TYPES.WEB) && this.isBrowserSupportRTC)) {
					return "web-rtc";
				}
				else {
					return "video-js";
					// return "third-party-player";
				}
			}
			return null;
		},
		validChannelPassword: function () {
			if (!this.passwordStream || this.passwordStream.length < this.minLengthPasswordStream)
				return false;
			return true;
		},
		classVideoJs: function () {
			return (this.channelStream && (this.channelStream.status === this.typeVideos.RECORDED)) ? 'live-video-player video-js-sdk' : 'video-js-sdk';
		},
		classLiveVideo: function () {
			if (this.isSharingScreen && this.isConnectedSharingScreen)
				return "live-with-share-screen";
			return "";
		},
		classCameraVideo: function () {
			if (this.isSharingScreen && this.isConnectedSharingScreen)
				return "camera-only";
			return "not-camera";
		},
	},
	watch: {
		isSwitching: function (val) {
			if (!val) {
				// Trigger play
				this.$root.$emit(`trigger-play-video`);
			}
		}
	},
	created() {

	},
	mounted() {
		// Get Viewer mobile OS / check browser support RTC
		this.viewerUsingMobileOS = this.getMobileOperatingSystem();
		this.isBrowserSupportRTC = this.checkBrowserSupportWebRTC();

		this.handleViewerEvents();

		// Navigator route:
		if (this.channelStream) {
			this.afterGetStreamSuccess(this.channelStream, this);
		}
		else { // get data stream
			let data = {
				slug: this.slugStream,
			};
			this.getDetailStream(data, SDK_API.GET_DETAIL_STREAM);
		}
	},
	methods: {
		handleViewerEvents: function () {
			let _this = this;

			/**
			 * Listener messages action send:
			 */
			this.$root.$on('send-channel-message', function(messageObject){
				_this.sendMessageToChannel(messageObject);
			});
			
			/**
			 * Listener messages naughty
			 */
			this.$root.$on('warning-user-naughty-word', function(){
				_this.textModalContent = "Your comment has been censored due to violation of terms";
				_this.$bvModal.show("text-modal");
			});
			
			/**
			 * Listener user was muted
			 */
			this.$root.$on('warning-user-muted', function(){
				_this.textModalContent = "You have been muted by Admin.";
				_this.$bvModal.show("text-modal");
			});
			
			/**
			 * Listener user was kicked
			 */
			this.$root.$on('warning-user-kicked', function(){
				_this.textModalContent = "You have been banned by Admin.";
				_this.$bvModal.show("text-modal");
			});

			/**
			 * Host end stream:
			 */
			this.$root.$on('host-end-stream', function(){
				_this.statusLiveStream = STATUS_REMOTE_STREAM.END;
				_this.updateEndResultStream();
			});
			
			/**
			 * Played video
			 */
			this.$root.$on('played-video-player', function(){
				_this.showLoading = false;
			});
			
			/**
			 * Video cannot load
			 */
			this.$root.$on('reset-video-js', function(){
				_this.showLoading = true;
				let videoSource = _this.videoJsPlayerOptions.urlSource;
				_this.videoJsPlayerOptions = Object.assign(_this.videoJsPlayerOptions, {
					urlSource: null
				});
				
				_this.videoJsPlayerOptions = Object.assign(_this.videoJsPlayerOptions, {
					urlSource: videoSource
				});
				
				_this.$nextTick(() => {
					setTimeout(() => {
						_this.reRenderComponent++;
					}, 3000)
				});
			});

			/**
			 * Host start share screen:
			 */
			this.$root.$on('start-share-screen', function(channel){
				//Do something
				_this.cameraInfo.streamName = channel;
				_this.isSharingScreen = true;
				_this.isSwitching = true;
				setTimeout(() => {
					_this.isSwitching = false;
				}, 3500);
			});

			/**
			 * Host stop share screen:
			 */
			this.$root.$on('stop-share-screen', function(){
				//Do something
				_this.cameraInfo.streamName = "";
				_this.isSharingScreen = false;
				_this.isSwitching = true;
				setTimeout(() => {
					_this.isSwitching = false;
				}, 3500);
			});

			/**
			 * On change status share screen:
			 */
			this.$root.$on('on-status-stream', function(data){
				//Do something
				if (data.channel === _this.cameraInfo.streamName) {
					_this.isConnectedSharingScreen = data.status;
				}
				setTimeout(() => {
					_this.isSwitching = false;
				}, 3000);
			});

			/**
			 * Host unlocked room:
			 */
			this.$root.$on('host-unlocked-room', function(){
				if (_this.isLockedRoom || _this.isWaitingScreen) {
					window.location.reload();
				}
			});

			/**
			 * Host started live-stream:
			 */
			this.$root.$on('host-started-stream', function(){
				if (_this.isLockedRoom || _this.isWaitingScreen) {
					window.location.reload();
				}
			});

		},
		goToWatch: function(passwordStream) {
			let _this = this;
			let data = {
				title: this.slugStream,
				password: passwordStream ? passwordStream : ""
			};
			this.getDetailStream(data, SDK_API.GET_DETAIL_CHANNEL).then(function () {
				_this.$bvModal.hide('password-modal');
			});
		},
		getDetailStream: async function (data, api) {
			let _this = this;
			this.$http
				.post(api, data)
				.then(response => {
					if (response.data.code === STATUS_RESPONSES.USER_BANNED_BY_ADMIN) {
						_this.$root.$emit(`warning-user-kicked`);
					}
					else {
						_this.afterGetStreamSuccess(response.data.data, _this);
					}
				})
				.catch(function (error) {
					console.log(error);
					_this.$toastr.e(SYSTEM_MESSAGES.CONTACT_ADMIN, STATUS_MESSAGES.ERROR);
					_this.statusLiveStream = STATUS_REMOTE_STREAM.STOPPED;
				})
				.then(() => {
				});
		},
		leaveStream: function () {
			this.$router.push({name: "Home"});
		},
        afterGetStreamSuccess: function (data, _this) {
			_this.$store.dispatch("updateChannelStreamData", data);
	
			_this.$store.dispatch("updateStreamStatistic", {
				TotalLikes: parseInt(data.likeCount) ? parseInt(data.likeCount) : 0,
				TotalViewers: parseInt(data.viewCount) ? parseInt(data.viewCount) : 0,
			});
			
            _this.slugStream = data.slug;
            _this.hostStreamInfo = data.publisher;
            
            // let guest = _this.getInfoViewer();
            // let waitingRoom = `notify_${_this.channelKey}`;
            // this.createNotifyChatRoom(guest, waitingRoom);

            if (data.isLocked) {
                _this.isLockedRoom = true;
            }
            else if (_this.slugStream) { // stream started
                _this.isWaitingScreen = false;
                _this.updateDataAndRenderPlayer(data, _this);
            }
        },
        updateDataAndRenderPlayer: function(data, _this) {
        	// if (this.viewerUsingMobileOS !== MOBILE_OS.UN_KNOWN) {
			//
        	// }
        	
            if (data.status === STATUS_VIDEO.LIVE) { // check status is Live
                if (_this.channelStream.publisher.deviceType === parseInt(DEVICE_TYPES.WEB)) {
                    // Live from web
                    _this.streamInfo.streamName = _this.channelStream.slug;
                }

                // update config for videojs player
                if (_this.channelStream.streamUrl) {
					_this.videoJsPlayerOptions = Object.assign(_this.videoJsPlayerOptions, {
						coverImage: _this.channelStream.coverImage,
						userImage: _this.channelStream.publisher.userImage,
						urlSource: _this.channelStream.streamUrl,
					});
					clearInterval(_this.intervalReloadDetailDataId);
					_this.intervalReloadDetailDataId = null;
                }
                else {
                	_this.intervalReloadDetailDataId = setInterval(() => {
						_this.reloadStreamUrl();
                	}, _this.timeIntervalReload)
                }

				_this.getPinnedMessage(_this);
				_this.getProductsInStream();
                _this.afterGetDataVideoSuccess();

                // Join room:
                _this.roomChatName = _this.channelStream.slug;
                // _this.createIntervalPingServer();
                _this.statusLiveStream = STATUS_REMOTE_STREAM.STREAMING;
                let guest = _this.getInfoViewer();
                _this.createChatRoom(guest, _this.roomChatName);

            }
            else if (data.status === STATUS_VIDEO.RECORDED) {
				_this.videoJsPlayerSetupOptions = Object.assign(_this.videoJsPlayerSetupOptions, {
					controls: true,
				});
				
                // update config for videojs player
                _this.videoJsPlayerOptions = Object.assign(_this.videoJsPlayerOptions, {
                    coverImage: _this.channelStream.coverImage,
                    userImage: _this.channelStream.publisher.userImage,
                    urlSource: _this.channelStream.streamUrl,
                });
	
				_this.getProductsInStream();
				
				// Join room:
				_this.roomChatName = _this.channelStream.slug;
				// _this.createIntervalPingServer();
				_this.statusLiveStream = STATUS_REMOTE_STREAM.PLAYING;
				let guest = _this.getInfoViewer();
				_this.createChatRoom(guest, _this.roomChatName);
            }
        },
        reloadStreamUrl: function () {
			let data = {
				slug: this.slugStream,
			};
			let _this = this;
			this.$http
				.post(SDK_API.GET_DETAIL_STREAM, data)
				.then(response => {
					if (response.data.code === STATUS_RESPONSES.USER_BANNED_BY_ADMIN) {
						_this.$root.$emit(`warning-user-kicked`);
					}
					else {
						_this.$store.dispatch("updateChannelStreamData", response.data.data);
						
						// update config for videojs player
						if (_this.channelStream.streamUrl) {
							_this.videoJsPlayerOptions = Object.assign(_this.videoJsPlayerOptions, {
								coverImage: _this.channelStream.coverImage,
								userImage: _this.channelStream.publisher.userImage,
								urlSource: _this.channelStream.streamUrl,
							});
							clearInterval(_this.intervalReloadDetailDataId);
							_this.intervalReloadDetailDataId = null;
						}
					}
				})
				.catch(function (error) {
					console.log(error);
					_this.$toastr.e(SYSTEM_MESSAGES.CONTACT_ADMIN, STATUS_MESSAGES.ERROR);
					_this.statusLiveStream = STATUS_REMOTE_STREAM.STOPPED;
				})
				.then(() => {
				});
        },
		afterGetDataVideoSuccess: function () {},
		viewerLeaveStream: async function () {
			if (this.channelStream && this.channelStream.viewSessionId) {
				let data = {
					streamUserId: this.channelStream.viewSessionId,
					slug: this.channelStream.slug
				};
				this.$http
					.post(SDK_API.LEAVE_STREAM, data)
					.then(response => {
						// get resume detail stream
						if (response.data.code === STATUS_RESPONSES.SUCCESS) {
						} else {

						}
					})
					.catch(function (error) {

					});
			}
            this.$store.dispatch("updateChannelStreamData", null);
			this.$store.dispatch("updateStateListStreamProducts", false);
        },
		getInfoViewer: function () {
			return {
				userName: this.user.userName ? this.user.userName : this.user.guestName,
				userId: this.user.userId ? this.user.userId : this.user.guestId,
				displayName: this.user.displayName ? this.user.displayName : `sdk_guest_${this.user.userId ? this.user.userId : this.user.guestId}`,
				avatarColor: this.user.avatarColor ? this.user.avatarColor : "",
				userImage: this.user.userImage ? this.user.userImage : "",
			};
		},
		getPinnedMessage: function (_this) {
			_this.$http.post(SDK_API.GET_PINNED_MESSAGE, {
					slug: _this.channelStream.slug
				})
				.then(response => {
					if (response.data.data) {
						_this.$store.dispatch("updatePinnedMessage", JSON.parse(response.data.data));
					}
				})
				.catch(function (error) {
					console.log(error);
					_this.$toastr.e(SYSTEM_MESSAGES.CONTACT_ADMIN, STATUS_MESSAGES.ERROR);
					_this.statusLiveStream = STATUS_REMOTE_STREAM.STOPPED;
				})
				.then(() => {
				});
		}
	},
	/**
	 *
	 * @returns {Promise<void>}
	 */
	async beforeDestroy() {
		console.log('Leave Stream');
		await this.viewerLeaveStream();
	}
};
