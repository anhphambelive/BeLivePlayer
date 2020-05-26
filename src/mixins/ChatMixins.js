import { mapGetters } from "vuex";
import {
	COMMUNICATE_CLIENT_SERVER_MODE,
	RECEIVER_TYPES,
	RTM_MESSAGE_TYPE, RTM_MESSAGES,
	RTM_MODES,
	STATUS_MEMBER
} from "../configs/RTM_SDK";
import InputHelperMixin from "../mixins/InputHelperMixin";
import MessageRTMMixin from "../mixins/MessageRTMMixin";
import { SDK_API } from "../configs/APIs";
import {STATUS_REMOTE_STREAM, STATUS_RESPONSES} from "../configs/SDK";
import {ROOM_CHANNEL_MESSAGES, STATUS_MESSAGES, SYSTEM_MESSAGES} from "../messages/System";

export default {
    name: "ChatMixins",
    components: {},
    mixins: [InputHelperMixin, MessageRTMMixin],
    props: {
        listChannelMessages: {
            type: Array / Object,
            default: function () {
                return [];
            }
        },
        chatBoxWrapper: {
            type: String,
            default: "#list-messages-box"
        },
        listWatching: {
            type: Array,
            default: function () {
                return [];
            }
        },
        isViewMode: {
            type: Boolean,
            default: true
        },
        isMobileLayout: {
            type: Boolean,
            default: false
        },
        isMuteUser: {
            type: Boolean,
            default: false
        },
        hostStreamInfo: {
            type: Object,
            default: function () {
                return null;
            }
        },
        streamInfo: {
            type: Object,
            default: function () {
                return null;
            }
        },
        currentChannelChatMode: {
            type: Number,
            default: RTM_MESSAGE_TYPE.CUSTOM_GROUPMODE_ABLECHAT
        },
        streamItem: {
            type: Object,
            default: null
        },
        listLikedAnimations: {
            type: Array / Object,
            default: function () {
                return [];
            }
        }
    },
    data() {
        return {
            isAtBottom: true,
            blockedUsers: [],
            currentChatMode: "Everyone",
            chatModeHeader: "Viewers can chat with:",
            chatModes: {
                GROUPMODE_ABLECHAT: "Everyone",
                GROUPMODE_ONLYHOST: "Host Only",
                GROUPMODE_MUTEALL: "Disable Chat"
            },
            communicateClientServerMode: COMMUNICATE_CLIENT_SERVER_MODE.ONLY_SERVER,
            channelChatModes: {
                CUSTOM_GROUPMODE_MUTEALL: RTM_MODES.GROUPMODE_MUTEALL,
                CUSTOM_GROUPMODE_ONLYHOST: RTM_MODES.GROUPMODE_ONLYHOST,
                CUSTOM_GROUPMODE_ABLECHAT: RTM_MODES.GROUPMODE_ABLECHAT,
            }
        };
    },
    computed: {
        ...mapGetters(["user", "pinnedMessage"]),
        currentUserIsHost: function () {
            if (this.hostStreamInfo && this.user && (parseInt(this.hostStreamInfo.userId) === parseInt(this.user.userId))) {
                return true;
            }
            return false;
        },
        disableChat: function () {
            if (this.isWaitingScreen || !this.user || this.isMuteUser
                || (this.currentChannelChatMode === this.channelChatModes.CUSTOM_GROUPMODE_MUTEALL)
            ) {
                return true;
            }
            return false;
        }
    },
    created() {
    },
    mounted() {
        if (this.$refs.messageDisplay) {
            this.$refs.messageDisplay.addEventListener('scroll', this.handleScrollingChatBox);
            this.scrollToEndChatBox();
        }
    },
    watch: {
        listChannelMessages: function () {
            this.$nextTick(() => {
                if (this.isAtBottom) this.scrollToEndChatBox();
            });
        },
    },
    methods: {
        handleScrollingChatBox(event) {
            if (event.target.scrollTop + event.target.clientHeight === event.target.scrollHeight) this.isAtBottom = true;
            else this.isAtBottom = false
        },
        sendChannelMessage: function (message, isClearAfterSent = true, type = RTM_MESSAGE_TYPE.MESSAGE, receiverType = RECEIVER_TYPES.RECEIVERTYPE_ALL, receiverUsername = "", otherData = null) {
            if (message && message.trim()) {
                let messageObject = this.formatMessageChannelBeforeSend(message.trim(), type, receiverType, receiverUsername, otherData);
                this.$root.$emit(`send-channel-message`, messageObject);
                if (isClearAfterSent) {
                    this.stringInput = "";
                }
            }
        },
        keyDownPress: function (e) {
            if (e.keyCode == 13 && !e.shiftKey) {
                e.preventDefault();
                this.sendChannelMessage(this.stringInput);
            }
        },
        scrollToEndChatBox: function () {
            let container = this.$el.querySelector(this.chatBoxWrapper);
            if (container) container.scrollTop = container.scrollHeight;
        },
		sendLikeStream: function (data) {
			this.$store.dispatch("updateChannelStreamData", {
				isLike: true
			});
			let _this = this;
			if (!data.isLikeClicked && !data.isLike) {
				let dataApi = {
					slug: this.channelStream.slug
				};
				this.$http
					.post(SDK_API.LIKE_STREAM, dataApi)
					.then(response => {
						if (response.data.code === STATUS_RESPONSES.SUCCESS) {
							// update data statistic stream:
							_this.$store.dispatch("updateStreamStatistic", {
								TotalLikes: parseInt(response.data.data.likeCount) ? parseInt(response.data.data.likeCount) : 0,
							});
						}
						else {
							_this.$store.dispatch("updateChannelStreamData", {
								isLike: false
							});
							_this.$root.$emit("reset-state-like-clicked", false);
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
			let msgObject = {
				message: RTM_MESSAGES.LIKE_STREAM,
				shouldShowLikeMessage: !data.isLike
			};
		
			let messageObject = this.formatMessageChannelBeforeSend(msgObject, RTM_MESSAGE_TYPE.LIKE);
			this.$root.$emit(`send-channel-message`, messageObject);
		},
        formatMessageRoom: function (messageItem) {
            let message = "";
            switch (messageItem.messageType) {
                case RTM_MESSAGE_TYPE.MESSAGE: {
                    message = messageItem.message;
                    break;
                }
                case RTM_MESSAGE_TYPE.USER_JOIN: {
                    message = "joined.";
                    break;
                }

                case RTM_MESSAGE_TYPE.LIKE: {
                    // message = `sent <img class="img-icon-message" width="12" src="../../static/media/icons/heart.svg">`;
                    message = `Liked the livestream!`;
                    break;
                }
                case RTM_MESSAGE_TYPE.USER_LEFT: {
                    message = "has left room.";
                    break;
                }

                case RTM_MESSAGE_TYPE.START_SHARE_SCREEN: {
                    message = "start share-screen.";
                    break;
                }

                case RTM_MESSAGE_TYPE.STOP_SHARE_SCREEN: {
                    message = "stop share-screen.";
                    break;
                }
            }
            return message;
        },
        getClassFromTypeMessage: function (type) {
            let classMessage = "";
            switch (type) {
                case RTM_MESSAGE_TYPE.MESSAGE: {
                    classMessage = "text";
                    break;
                }

                case RTM_MESSAGE_TYPE.LIKE: {
                    classMessage = "like";
                    break;
                }

                case RTM_MESSAGE_TYPE.USER_JOIN: {
                    classMessage = "userJoin";
                    break;
                }
                case RTM_MESSAGE_TYPE.USER_LEFT: {
                    classMessage = "userLeft";
                    break;
                }
                case RTM_MESSAGE_TYPE.START_SHARE_SCREEN:
                case RTM_MESSAGE_TYPE.STOP_SHARE_SCREEN: {
                    classMessage = "share-screen";
                    break;
                }
            }
            return classMessage;
        },

        switchChatMode: function (mode, keyMode) {
            if (this.currentUserIsHost && !this.isViewMode) { // Host only action
                this.currentChatMode = mode;

                if (this.communicateClientServerMode === COMMUNICATE_CLIENT_SERVER_MODE.ONLY_CLIENT) {
                    this.sendChannelMessage(keyMode, false, RTM_MESSAGE_TYPE[`CUSTOM_${keyMode}`]);
                }
                else if (this.communicateClientServerMode === COMMUNICATE_CLIENT_SERVER_MODE.ONLY_SERVER) {
                    this.$root.$emit("change-chat-mode", RTM_MODES[keyMode]);
                }
                else {
                    this.sendChannelMessage(keyMode, false, RTM_MESSAGE_TYPE[`CUSTOM_${keyMode}`]);
                    this.$root.$emit("change-chat-mode", RTM_MODES[keyMode]);
                }
            }
        },
        forceUserLeaveRoom: function (user) {
            if (this.currentUserIsHost && !this.isViewMode) { // Host only action
                // let kickViewer = {
                // 	"userId": parseInt(user.user_id),
                // 	"slug": this.streamInfo.slug
                // };
                let _this = this;
                // this.$http
                // 	.post(SDK_API.KICK_VIEWER, kickViewer)
                // 	.then(function (response) {
                // 		if (response.data.code === STATUS_RESPONSES.SUCCESS) {
                // 			if (_this.communicateClientServerMode === COMMUNICATE_CLIENT_SERVER_MODE.ONLY_CLIENT) {
                // 				_this.sendChannelMessage(user.username, false, RTM_MESSAGE_TYPE.CUSTOM_MODE_HOST_KICK_USER);
                // 			}
                // 			else if (this.communicateClientServerMode === COMMUNICATE_CLIENT_SERVER_MODE.ONLY_SERVER) {
                // 				_this.$root.$emit("host-update-status-member", RTM_MESSAGE_TYPE.HOST_KICKED, user.username);
                // 			}
                // 			else {
                // 				this.sendChannelMessage(user.username, false, RTM_MESSAGE_TYPE.CUSTOM_MODE_HOST_KICK_USER);
                // 				_this.$root.$emit("host-update-status-member", RTM_MESSAGE_TYPE.HOST_KICKED, user.username);
                // 			}
                // 			_this.$toastr.s(ROOM_CHANNEL_MESSAGES.HOST_KICK_USER_SUCCESS, STATUS_MESSAGES.SUCCESS);
                // 		} else {
                // 			_this.$toastr.e(response.data.message, STATUS_MESSAGES.ERROR);
                // 		}
                // 	}, (error) => {
                // 		_this.$toastr.e(error.response.data.message, STATUS_MESSAGES.ERROR);
                // 	})
                // 	.catch(function (error) {
                // 		_this.$toastr.e(error);
                // 	});

                if (_this.communicateClientServerMode === COMMUNICATE_CLIENT_SERVER_MODE.ONLY_CLIENT) {
                    _this.sendChannelMessage(user.username, false, RTM_MESSAGE_TYPE.CUSTOM_MODE_HOST_KICK_USER);
                }
                else if (this.communicateClientServerMode === COMMUNICATE_CLIENT_SERVER_MODE.ONLY_SERVER) {
                    _this.$root.$emit("host-update-status-member", RTM_MESSAGE_TYPE.HOST_KICKED, user.username);
                }
                else {
                    this.sendChannelMessage(user.username, false, RTM_MESSAGE_TYPE.CUSTOM_MODE_HOST_KICK_USER);
                    _this.$root.$emit("host-update-status-member", RTM_MESSAGE_TYPE.HOST_KICKED, user.username);
                }
            }
        },
        toggleMuteChatUser: function (username, status) {
            if (this.currentUserIsHost && !this.isViewMode) { // Host only action
                if (this.communicateClientServerMode === COMMUNICATE_CLIENT_SERVER_MODE.ONLY_CLIENT) {
                    if (status === STATUS_MEMBER.NORMAL) {
                        this.sendChannelMessage(username, false, RTM_MESSAGE_TYPE.CUSTOM_MODE_HOST_MUTE_USER);
                    }
                    else if ((status === STATUS_MEMBER.DISABLED) || (status === STATUS_MEMBER.ONLY_RECEIVE)) {
                        this.sendChannelMessage(username, false, RTM_MESSAGE_TYPE.CUSTOM_MODE_HOST_UNMUTE_USER);
                    }
                }
                else if (this.communicateClientServerMode === COMMUNICATE_CLIENT_SERVER_MODE.ONLY_SERVER) {
                    if (status === STATUS_MEMBER.NORMAL) {
                        this.$root.$emit("host-update-status-member", RTM_MESSAGE_TYPE.HOST_MUTED, username);
                    }
                    else if ((status === STATUS_MEMBER.DISABLED) || (status === STATUS_MEMBER.ONLY_RECEIVE)) {
                        this.$root.$emit("host-update-status-member", RTM_MESSAGE_TYPE.HOST_UNMUTED, username);
                    }
                }
                else {
                    if (status === STATUS_MEMBER.NORMAL) {
                        this.sendChannelMessage(username, false, RTM_MESSAGE_TYPE.CUSTOM_MODE_HOST_MUTE_USER);
                        this.$root.$emit("host-update-status-member", RTM_MESSAGE_TYPE.HOST_MUTED, username);
                    }
                    else if ((status === STATUS_MEMBER.DISABLED) || (status === STATUS_MEMBER.ONLY_RECEIVE)) {
                        this.sendChannelMessage(username, false, RTM_MESSAGE_TYPE.CUSTOM_MODE_HOST_UNMUTE_USER);
                        this.$root.$emit("host-update-status-member", RTM_MESSAGE_TYPE.HOST_UNMUTED, username);
                    }
                }
            }
        },
        enterLikeTransition: function (el, done) {
            el.remove();
        },
    }
};
