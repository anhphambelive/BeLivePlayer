import { BeliveRtmClient } from "../assets/libs/BeliveCore_RTM_Web/beliveRTM";
import EventManager from "../assets/libs/BeliveCore_RTM_Web/eventManager";
import { RTM_MESSAGE_TYPE, RTM_MODES, STATUS_MEMBER } from "../configs/RTM_SDK";
import { mapGetters } from "vuex";
import { ROOM_CHANNEL_MESSAGES, STATUS_MESSAGES } from "../messages/System";
import { STATUS_VIDEO } from "../configs/SDK";
import { ALLOW_GUEST_JOINED_MESSAGE, ALLOW_RANDOM_COLOR, BG_COLORS } from "../configs/Settings"

export default {
    name: "SdkChatMixin",
    data() {
        return {
            // demo data:
            chatServer: BELIVESDK_WEB_CHAT_ENDPOINT,
            licenseKey: BELIVESDK_WEB_CHAT_KEY,
            chatClient: null,
            notifyChatClient: null,
            listChannelMessages: [],
            listLikedAnimations: [],
            listUserJoined: [],
            listTotalUserJoin: [],
            isAnimation: false,
            listUserCurrentJoin: [],
            concurrentUserJoined: 0,
            currentUserAppearIndex: 0,
            listWatching: [],
            currentChannelChatMode: RTM_MODES.GROUPMODE_ABLECHAT,
            isMuteUser: false,
            isHostChannel: false,
            isHostNotifyChannel: false,

            historyChats: null,
            lastTimePlayer: 0,
            listShowLiked: [],
        };
    },
    computed: {
        ...mapGetters(["user", "streamStatistic", "channelStream"])
    },
    watch: {
        "channelStream": {
            handler(val, oldVal) {
                let _this = this;
                if (val && val.status === STATUS_VIDEO.RECORDED) {
                    this.$root.$on('update-time-video-player', function (time) {
                        //Do something
                        _this.parseHistoryChatByVideoTime(time);
                    });

                    this.$root.$on('ended-video-player', function () {
                        //Do something
                        // _this.channelTextSticker = null;
                    });

                    this.getLogHistoryLiveChat();
                }
            },
            deep: true
        },
        listTotalUserJoin(newValue) {
            if (!this.isAnimation) {
                var newMsg = newValue[this.currentUserAppearIndex]
                if (!newMsg) return;
                this.addUserJoin(newMsg)
            }
        },
        isAnimation(newValue) {
            if (newValue) return;
            var newMsg = this.listTotalUserJoin[this.currentUserAppearIndex]
            if (!newMsg) return;
            this.addUserJoin(newMsg)
        }

    },
    created() {
    },
    mounted() {
    },
    methods: {
        randomColor(previousColor) {
            let newColor = BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)];
            if (previousColor === newColor) return this.randomColor(previousColor);
            return newColor;
        },
        addUserJoin(data) {
            if (!data) return;
            let user = data.user;
            if (data.concurrent == 1) user.senderDisplayName = `${user.senderDisplayName} and ${data.concurrent} viewer`
            else if (data.concurrent > 1) user.senderDisplayName = `${user.senderDisplayName} and ${data.concurrent} viewers`
            this.isAnimation = true;
            this.listUserCurrentJoin.push(user);
            setTimeout(() => {
                this.listUserCurrentJoin.splice(0, 1);
                setTimeout(() => {
                    this.currentUserAppearIndex += 1;
                    this.isAnimation = false;
                }, 400)
            }, 2000)
        },
		/**
		 *
		 * @param user
		 * @param channel
		 * @param isHost
		 * @param server
		 * @param licenseKey
		 */
        createChatRoom: function (user, channel, isHost = false, server = null, licenseKey = null) {
            let _this = this;
            if (!server) server = this.chatServer;
            if (!licenseKey) licenseKey = this.licenseKey;

            this.chatClient = new BeliveRtmClient(server, channel, user, licenseKey);

            this.isHostChannel = isHost;

            setTimeout(() => {
                this.chatClient.init();
            }, 1000);
            EventManager.subscribe(channel, function (message) {
                console.log("EventManager.subscribe('" + channel + "')");
                console.log("message original channel", message);
                try {
                    let messageChannel = JSON.parse(message.toString());
                    if (messageChannel.channel === channel) {
                        _this.switchMessageType(messageChannel);
                    }
                    console.log("message channel", messageChannel);
                }
                catch (e) {
                    console.log("Error RTM", e);
                }
            });
        },

		/**
		 *
		 * @param user
		 * @param channel
		 * @param isHost
		 * @param server
		 * @param licenseKey
		 * @returns {Promise<void>}
		 */
        createNotifyChatRoom: async function (user, channel, isHost = false, server = null, licenseKey = null) {
            let _this = this;
            if (!server) server = this.chatServer;
            if (!licenseKey) licenseKey = this.licenseKey;

            this.notifyChatClient = new BeliveRtmClient(server, channel, user, licenseKey);
            this.isHostNotifyChannel = isHost;

            setTimeout(() => {
                this.notifyChatClient.init();
            }, 1000);
            EventManager.subscribe(channel, function (message) {
                console.log("EventManager.subscribe('" + channel + "')");
                console.log("message original channel", message);
                try {
                    let messageChannel = JSON.parse(message.toString());
                    if (messageChannel.channel === channel) {
                        _this.switchNotifyMessageType(messageChannel);
                    }
                    console.log("message channel", messageChannel);
                }
                catch (e) {
                    console.log("Error RTM", e);
                }
            });
        },

		/**
		 *
		 * @param message
		 */
        sendMessageToChannel: function (message) {
            if (!message || !message.message) return;
            this.chatClient.SendMessageToGroup(message);

            if (this.currentChannelChatMode === RTM_MODES.GROUPMODE_ONLYHOST && !this.isHostChannel) {
                let userId = this.user.userId ? parseInt(this.user.userId) : parseInt(this.user.guestId);
                let messageLocal = {
                    message: message.message,
                    messageType: message.messageType,
                    receiver_type: message.receiver_type,
                    receiver_username: message.receiver_username,
                    recorded_time: null,
                    sender_avatar_color: this.user.avatarColor,
                    sender_avatar_url: this.user.userImage,
                    sender_display_name: this.user.displayName ? this.user.displayName : `sdk_guest_${this.user.userId ? this.user.userId : this.user.guestId}`,
                    senderUserId: userId,
                    sender_username: this.user.userName ? this.user.userName : this.user.guestName,
                };
                this.listChannelMessages.push(messageLocal);
            }
        },

		/**
		 *
		 * @param message
		 */
        sendNotifyToChannel: function (message) {
            if (!message) return;
            this.notifyChatClient.SendMessageToGroup(message);
        },

		/**
		 *
		 * @param mode
		 */
        changeModeChat: function (mode) {
            this.chatClient.HostChangeMode(mode);
        },

		/**
		 *
		 * @param mode
		 * @param username
		 */
        hostUpdateStatusMember: function (mode, username) {
            if (!mode) return;
            this.chatClient.HostUpdateStatusMember(mode, username);
        },

		/**
		 *
		 * @param message
		 */
        switchMessageType: function (message) {
            switch (message.messageType) {
                case RTM_MESSAGE_TYPE.MESSAGE: {
                    if (this.currentChannelChatMode === RTM_MODES.GROUPMODE_ABLECHAT
                        || this.isHostChannel
                        || (this.currentChannelChatMode === RTM_MODES.GROUPMODE_ONLYHOST && ((this.user.userName === message.sender_username) || (this.user.guestName === message.sender_username)))
                        || (this.currentChannelChatMode === RTM_MODES.GROUPMODE_ONLYHOST && !this.isHostChannel)
                    ) {
                        let userNameColor = '';
                        if (ALLOW_RANDOM_COLOR) {
                            let previousMsg = this.listChannelMessages[this.listChannelMessages.length - 1];
                            if (previousMsg) userNameColor = this.randomColor(previousMsg.userNameColor);
                        }
                        this.listChannelMessages.push({ ...message, userNameColor });
                    }
                    break;
                }
                case RTM_MESSAGE_TYPE.LIKE: {
                    if (message.shouldShowLikeMessage) {
                        this.listChannelMessages.push(message);
                    }
                    let transition = {
                        bgClassAnimation: 'bg-animation-' + Math.floor((Math.random() * 3) + 1),
                        animationClass: 'animation-style-' + Math.floor((Math.random() * 3) + 1),
                    };

                    this.listLikedAnimations.push(transition);
                    break;
                }

                case RTM_MESSAGE_TYPE.HOST_PINNED_MESSAGE: {
                    this.$store.dispatch("updatePinnedMessage", message);
                    break;
                }

                case RTM_MESSAGE_TYPE.HOST_UNPIN_MESSAGE: {
                    this.$store.dispatch("updatePinnedMessage", null);
                    break;
                }

                case RTM_MESSAGE_TYPE.ADMIN_MUTED: {
                    let messageData = JSON.parse(message.message.toString());
                    if ((parseInt(messageData.ReceiverUserId) === this.user.userId) || (parseInt(messageData.ReceiverUserId) === this.user.guestId)) {
                        this.$store.dispatch("updateChannelStreamData", {
                            isMute: true
                        });
                        this.$root.$emit(`warning-user-muted`);
                    }
                    break;
                }

                case RTM_MESSAGE_TYPE.ADMIN_UN_MUTED: {
                    let messageData = JSON.parse(message.message.toString());
                    if ((parseInt(messageData.ReceiverUserId) === this.user.userId) || (parseInt(messageData.ReceiverUserId) === this.user.guestId)) {
                        this.$store.dispatch("updateChannelStreamData", {
                            isMute: false
                        });
                    }
                    break;
                }

                case RTM_MESSAGE_TYPE.ADMIN_KICK: {
                    let messageData = JSON.parse(message.message.toString());
                    if ((parseInt(messageData.ReceiverUserId) === this.user.userId) || (parseInt(messageData.ReceiverUserId) === this.user.guestId)) {
                        this.$store.dispatch("updateStateKickUser", true);
                        this.$root.$emit(`warning-user-kicked`);
                    }
                    break;
                }

                case RTM_MESSAGE_TYPE.ADMIN_UN_KICK: {
                    let messageData = JSON.parse(message.message.toString());
                    if ((parseInt(messageData.ReceiverUserId) === this.user.userId) || (parseInt(messageData.ReceiverUserId) === this.user.guestId)) {
                        this.$store.dispatch("updateStateKickUser", false);
                    }
                    break;
                }

                case RTM_MESSAGE_TYPE.USER_JOIN: {
                    let newUser = {
                        userId: parseInt(message.senderUserId),
                        userName: message.sender_username
                    };

                    let checkUserHasJoined = this.listUserJoined.filter(user => {
                        return user.userId === newUser.userId;
                    });

                    if (!checkUserHasJoined.length) {
                        this.listUserJoined.push(newUser);
                        if (
                            this.user.userId !== newUser.userId &&
                            this.user.userName !== newUser.userName &&
                            this.user.guestId !== newUser.userId &&
                            this.user.guestName !== newUser.userName
                        ) {
                            let userJoin = { user: message, concurrent: 0 }
                            if (!ALLOW_GUEST_JOINED_MESSAGE && userJoin.user.senderUserName.indexOf("+guest_") > -1) return;
                            if (this.listTotalUserJoin.length - 1 <= this.currentUserAppearIndex) {
                                this.listTotalUserJoin.push(userJoin);
                            }
                            else if (this.isAnimation) {
                                this.listTotalUserJoin[this.listTotalUserJoin.length - 1].concurrent += 1;
                            }

                        }
                    }
                    break;
                }

                case RTM_MESSAGE_TYPE.CUSTOM_GROUPMODE_MUTEALL:
                case RTM_MESSAGE_TYPE.CUSTOM_GROUPMODE_ONLYHOST:
                case RTM_MESSAGE_TYPE.CUSTOM_GROUPMODE_ABLECHAT: {
                    this.currentChannelChatMode = this.mappingRTMModes(parseInt(message.messageType));
                    break;
                }
                case RTM_MESSAGE_TYPE.STATISTICS: {
                    if (message.message) {
                        let messageData = JSON.parse(message.message.toString());
                        // update data statistic stream:
                        this.$store.dispatch("updateStreamStatistic", {
                            TotalLikes: parseInt(messageData.totalLikes) ? parseInt(messageData.totalLikes) : 0,
                            TotalViewers: parseInt(messageData.totalViewers) ? parseInt(messageData.totalViewers) : 0,
                        });

                        this.$store.dispatch("updateChannelStreamData", {
                            promoCode: messageData.promoCode ? messageData.promoCode : null,
                            cartUrl: messageData.cartUrl ? messageData.cartUrl : null,
                            isShowViewCount: messageData.isShowView ? messageData.isShowView : false,
                            isShowLikeCount: messageData.isShowLike ? messageData.isShowLike : false,
                        });
                    }
                    else {
                        this.$store.dispatch("updateStreamStatistic", {
                            TotalLikes: parseInt(message.totalLikes) ? parseInt(message.totalLikes) : 0,
                            TotalViewers: parseInt(message.totalViewers) ? parseInt(message.totalViewers) : 0,
                        });
                    }

                    break;
                }
                case RTM_MESSAGE_TYPE.HOST_SORT_PRODUCT: {
                    this.$store.dispatch("resortStreamProducts", {
                        newIndex: message.newIndex,
                        productId: message.productId,
                    });

                    break;
                }

                case RTM_MESSAGE_TYPE.HOST_KICKED: {
                    if ((this.user.userName === message.receiver_username) || (this.user.guestName === message.receiver_username)) {
                        this.$toastr.w(ROOM_CHANNEL_MESSAGES.USER_WAS_KICKED_ROOM, STATUS_MESSAGES.WARNING);
                        this.$router.push({ name: "Home" });
                    }
                    break;
                }
                case RTM_MESSAGE_TYPE.CUSTOM_MODE_HOST_KICK_USER: {
                    if ((this.user.userName === message.message) || (this.user.guestName === message.message)) {
                        this.$toastr.w(ROOM_CHANNEL_MESSAGES.USER_WAS_KICKED_ROOM, STATUS_MESSAGES.WARNING);
                        this.$router.push({ name: "Home" });
                    }
                    break;
                }
                case RTM_MESSAGE_TYPE.CUSTOM_MODE_HOST_UN_KICK_USER: {
                    if ((this.user.userName === message.message) || (this.user.guestName === message.message)) {
                        // this.isMuteUser = true;
                    }
                    break;
                }
                case RTM_MESSAGE_TYPE.CUSTOM_MODE_HOST_MUTE_USER: {
                    if ((this.user.userName === message.message) || (this.user.guestName === message.message)) {
                        this.isMuteUser = true;
                    }
                    break;
                }
                case RTM_MESSAGE_TYPE.CUSTOM_MODE_HOST_UNMUTE_USER: {
                    if ((this.user.userName === message.message) || (this.user.guestName === message.message)) {
                        this.isMuteUser = false;
                    }
                    break;
                }
                case RTM_MESSAGE_TYPE.HOST_STREAM_ENDED: {
                    this.$root.$emit(`host-end-stream`);
                    break;
                }
                case RTM_MESSAGE_TYPE.HOST_UN_LOCKED_ROOM: {
                    this.$root.$emit(`host-unlocked-room`);
                    break;
                }
                case RTM_MESSAGE_TYPE.HOST_STARTED_STREAM: {
                    this.$root.$emit(`host-started-stream`);
                    break;
                }
            }
        },

		/**
		 *
		 * @param message
		 */
        switchNotifyMessageType: function (message) {
            switch (message.messageType) {
                case RTM_MESSAGE_TYPE.MESSAGE: {
                    if (this.currentChannelChatMode === RTM_MODES.GROUPMODE_ONLYHOST) {
                        this.listChannelMessages.push(message);
                    }
                    break;
                }
                case RTM_MESSAGE_TYPE.USER_JOIN: {
                    let newUser = {
                        userId: parseInt(message.senderUserId),
                        userName: message.sender_username
                    };

                    let checkUserHasJoined = this.listUserJoined.filter(user => {
                        return user.userId === newUser.userId;
                    });

                    if (!checkUserHasJoined.length) {
                        this.listUserJoined.push(newUser);
                        if (
                            this.user.userId !== newUser.userId &&
                            this.user.userName !== newUser.userName &&
                            this.user.guestId !== newUser.userId &&
                            this.user.guestName !== newUser.userName
                        )
                            this.listChannelMessages.push(message);
                    }
                    break;
                }
                case RTM_MESSAGE_TYPE.STATISTICS: {

                    break;
                }
                case RTM_MESSAGE_TYPE.START_SHARE_SCREEN: {
                    let sender = {
                        userId: parseInt(message.senderUserId),
                        userName: message.sender_username
                    };

                    if (
                        this.user.userId !== sender.userId &&
                        this.user.userName !== sender.userName &&
                        this.user.guestId !== sender.userId &&
                        this.user.guestName !== sender.userName
                    ) {
                        this.$root.$emit(`start-share-screen`, message.message);
                    }

                    this.listChannelMessages.push(message);
                    break;
                }
                case RTM_MESSAGE_TYPE.STOP_SHARE_SCREEN: {
                    let sender = {
                        userId: parseInt(message.senderUserId),
                        userName: message.sender_username
                    };

                    if (
                        this.user.userId !== sender.userId &&
                        this.user.userName !== sender.userName &&
                        this.user.guestId !== sender.userId &&
                        this.user.guestName !== sender.userName
                    ) {
                        this.$root.$emit(`stop-share-screen`, message.message);
                    }

                    this.listChannelMessages.push(message);
                    break;
                }
                case RTM_MESSAGE_TYPE.HOST_STREAM_ENDED: {
                    this.$root.$emit(`host-end-stream`);
                    break;
                }
                case RTM_MESSAGE_TYPE.HOST_UN_LOCKED_ROOM: {
                    this.$root.$emit(`host-unlocked-room`);
                    break;
                }
                case RTM_MESSAGE_TYPE.HOST_STARTED_STREAM: {
                    this.$root.$emit(`host-started-stream`);
                    break;
                }
            }
        },

		/**
		 * Disconnect server chat
		 */
        disconnectServerChat: function () {
            console.log('disconnect chat');
            if (this.chatClient)
                this.chatClient.DisconnectConnection();
        },

		/**
		 * Mapping RTM Modes
		 * @param customMode
		 * @returns {number}
		 */
        mappingRTMModes: function (customMode) {
            switch (customMode) {
                case RTM_MESSAGE_TYPE.CUSTOM_GROUPMODE_ABLECHAT:
                    return RTM_MODES.GROUPMODE_ABLECHAT;

                case RTM_MESSAGE_TYPE.CUSTOM_GROUPMODE_ONLYHOST:
                    return RTM_MODES.GROUPMODE_ONLYHOST;

                case RTM_MESSAGE_TYPE.CUSTOM_GROUPMODE_MUTEALL:
                    return RTM_MODES.GROUPMODE_MUTEALL;
            }
        },

		/**
		 * Render History Chat
		 * @param time
		 * @returns {boolean}
		 */
        parseHistoryChatByVideoTime: function (time) {
            if (!this.historyChats)
                return false;
            let _this = this;
            if (this.lastTimePlayer > Math.ceil(time)) {
                _this.$store.dispatch("updatePinnedMessage", null);
                this.listShowLiked = [];
            }
            this.listChannelMessages = [];
            this.historyChats.every((el, index, arr) => {
                if (el.recordedTime / 1000 <= Math.ceil(time)) {
                    let msg = el;
                    switch (el.messageType) {
                        case RTM_MESSAGE_TYPE.LIKE: {
                            if (el.shouldShowLikeMessage) {
                                _this.listChannelMessages.push(msg);
                            }
                            if (!(jQuery.inArray(index, _this.listShowLiked) !== -1)) {
                                let transition = {
                                    bgClassAnimation: 'bg-animation-' + Math.floor((Math.random() * 3) + 1),
                                    animationClass: 'animation-style-' + Math.floor((Math.random() * 3) + 1),
                                };
                                _this.listLikedAnimations.push(transition);
                                _this.listShowLiked.push(index);
                            }
                            break;
                        }

                        case RTM_MESSAGE_TYPE.HOST_PINNED_MESSAGE: {
                            _this.$store.dispatch("updatePinnedMessage", el);
                            break;
                        }

                        case RTM_MESSAGE_TYPE.HOST_UNPIN_MESSAGE: {
                            _this.$store.dispatch("updatePinnedMessage", null);
                            break;
                        }

                        case RTM_MESSAGE_TYPE.STREAM_TITLE_STICKER: {
                            _this.channelTextSticker = el.textSticker;
                            _this.listChannelMessages.push(msg);
                            break;
                        }

                        case RTM_MESSAGE_TYPE.MESSAGE:
                        case RTM_MESSAGE_TYPE.GIFT:
                        case RTM_MESSAGE_TYPE.JOIN:
                        case RTM_MESSAGE_TYPE.FOLLOW:
                        case RTM_MESSAGE_TYPE.SHARE:
                            {
                                _this.listChannelMessages.push(msg);
                                break;
                            }

                    }
                    _this.lastTimePlayer = Math.ceil(time);
                    return _this.listChannelMessages;
                }
            });
        },

		/**
		 * Get History Chat
		 */
        getLogHistoryLiveChat: function () {
            let _this = this;
            if (this.channelStream.historyChat) {
                fetch(this.channelStream.historyChat)
                    .then(function (response) {
                        return response.json(); // As a function call
                    })
                    .then(function (data) {
                        _this.historyChats = data;
                        console.log('log history chat', data)
                    });
            }
        },
    },
    beforeDestroy() {
        this.disconnectServerChat();
    }
};
