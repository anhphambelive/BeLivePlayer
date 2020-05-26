import {RECEIVER_TYPES, RTM_MESSAGE_TYPE} from "../configs/RTM_SDK";
import {mapGetters} from "vuex";
import {STATUS_MESSAGES, SYSTEM_MESSAGES} from "../messages/System";
import {STATUS_REMOTE_STREAM, STATUS_RESPONSES} from "../configs/SDK";
import {SDK_API} from "../configs/APIs";

export default {
	name: "MessageRTMMixin",
	data() {
		return {
			// demo data:
			listNaughtyWords: [],
		};
	},
	computed: {
		...mapGetters(["user"])
	},
	watch: {},
	created() {
	},
	mounted() {
		this.getListNaughtyWords();
	},
	methods: {
		/**
		 *
		 * @param newMessage
		 * @param type
		 * @param receiverType
		 * @param receiverUsername
		 * @param otherData
		 * @returns {{senderDisplayName: null, messageType: *, senderUserId: (null|number), senderAvatar: null, senderUserName: null}|boolean}
		 */
		formatMessageChannelBeforeSend: function (newMessage, type = RTM_MESSAGE_TYPE.MESSAGE, receiverType = RECEIVER_TYPES.RECEIVERTYPE_ALL, receiverUsername = "", otherData = null) {
			if (!this.user) return false;

			let messageChannel = {
				messageType: type,
				senderAvatar: this.user.userImage,
				senderDisplayName: this.user.displayName,
				senderUserId: this.user.userId ? this.user.userId : this.user.guestId,
				senderUserName: this.user.userName
					? this.user.userName
					: this.user.guestName
			};
			
			// Additional data for each type message
			switch (type) {
				case RTM_MESSAGE_TYPE.MESSAGE: {
					// Check naughty:
					let isNaughty = false;
					newMessage = newMessage.trim();
					let arrayWords = newMessage.trim().split(" ");
					arrayWords.map((messageWord, indexMessageWord) => {
						this.listNaughtyWords.map((naugtyWord, index) => {
							if (naugtyWord.trim().toLowerCase() === messageWord.trim().toLowerCase()) {
								isNaughty = true;
								newMessage = newMessage.replace(messageWord, "");
							}
						});
					});
					
					if (isNaughty) {
						this.$root.$emit("warning-user-naughty-word");
					}
					
					console.log("IS NAUGHTY", isNaughty);
					
					// let stringRegexNaughty = "\\b" + this.listNaughtyWords.join("\\b|\\b") + "\\b";
					// console.log("NAUGHTY", stringRegexNaughty);
					//
					// let removedNaughtyMessage = newMessage.replace(new RegExp(stringRegexNaughty, "gi"), "");
					//
					// if (removedNaughtyMessage.length !== newMessage.length) {
					// 	// Popup naughty:
					// 	this.$root.$emit("warning-user-naughty-word");
					// }
					
					messageChannel = Object.assign(messageChannel, {
						message: newMessage
					});
					break;
				}
				
				
				case RTM_MESSAGE_TYPE.USER_LEFT:
				case RTM_MESSAGE_TYPE.USER_JOIN: {
					messageChannel = Object.assign(messageChannel, {
						message: newMessage
					});
					break;
				}
				
				case RTM_MESSAGE_TYPE.START_STREAM:
				case RTM_MESSAGE_TYPE.STOP_STREAM:
				case RTM_MESSAGE_TYPE.START_SHARE_SCREEN:
				case RTM_MESSAGE_TYPE.STOP_SHARE_SCREEN: {
					messageChannel = Object.assign(messageChannel, {
						message: newMessage
					});
					break;
				}
				
				case RTM_MESSAGE_TYPE.STATISTIC: {
					messageChannel = Object.assign(messageChannel, newMessage);
					break;
				}
				
				case RTM_MESSAGE_TYPE.LIKE: {
					messageChannel = Object.assign(messageChannel, newMessage);
					break;
				}
			}
			
			return messageChannel;
		},
		
		/**
		 * Get list naughty words
		 *
		 */
		getListNaughtyWords: function () {
			let _this = this;
			this.$http
				.post(SDK_API.NAUGHTY_WORDS)
				.then(response => {
					if (response.data.code === STATUS_RESPONSES.SUCCESS) {
						_this.listNaughtyWords = response.data.data;
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
	}
};
