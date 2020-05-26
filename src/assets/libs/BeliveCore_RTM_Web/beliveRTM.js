import EventManager from "./eventManager.js";

export class BeliveRtmClient {
	constructor(host, channel, user, license) {
		// var id = '_' + Math.random().toString(36).substr(2, 9);
		this._client = new WebSocket("wss://" + host + "/ws");
		this._connected = false;
		this._xchatToken = "";
		this._licenseKey = license;
		this._userName = user.userName;
		this._userId = user.userId;
		this._displayName = user.displayName;
		this._channelSubscribed = channel;
	}
	
	// Make the function wait until the connection is made...
	
	/**
	 *
	 * @param channel
	 * @returns {Promise<void>}
	 */
	async logIn(channel) {
		console.log("LogIn...   ", this._client.readyState);
		if (this._client.readyState < 1) {
			return;
		}
		// simple unary call
		
		await this._sendToServer(
			JSON.stringify({
				blockUserId: 0,
				gender: 0,
				giftId: 0,
				isExpensive: false,
				totalLikes: 0,
				message: "login",
				messageType: 10,
				mutedUserId: 0,
				senderAvatar: "",
				senderDisplayName: this.getDisplayName(),
				senderUserId: this.getUserId(),
				senderUserName: this.getUserName(),
				streamDuration: 0,
				totalReceivedStars: 0,
				totalViewers: 0,
				channel: channel,
				licenseKey: this.getLicenseKey(),
			})
		);
	}
	
	init() {
		console.log("init...");
		let _this = this;
		this.logIn(this._channelSubscribed).then(function () {
			setTimeout(function () {
				_this.subscribe(_this._channelSubscribed);
			}, 500)
		});
	}
	
	subscribe(chann) {
		console.log("Subscribe...  ", chann);
		if (this.getClient().readyState < 1) {
			return;
		}
		this._sendToServer(
			JSON.stringify({
				blockUserId: 0,
				gender: 0,
				giftId: 0,
				isExpensive: false,
				totalLikes: 0,
				message: "joinstream",
				messageType: 100,
				mutedUserId: 0,
				senderAvatar: "",
				senderDisplayName: this.getDisplayName(),
				senderUserId: this.getUserId(),
				senderUserName: this.getUserName(),
				streamDuration: 0,
				totalReceivedStars: 0,
				totalViewers: 0,
				licenseKey: this.getLicenseKey(),
				channel: chann
			})
		);
		this.getClient().onclose = function () {
			EventManager.publish(chann, "__LostedConnection");
		};
		this.getClient().onmessage = function (evt) {
			var messages = evt.data.split("\n");
			for (var i = 0; i < messages.length; i++) {
				console.info(chann);
				console.info(messages[i]);
				console.info(JSON.parse(messages[i]));
				EventManager.publish(chann, messages[i]);
			}
		};
	}
	
	UnSubscribe(chann) {
		console.log("UnSubscribe...");
		if (this.getClient().readyState !== 1) {
			return;
		}
		this._sendToServer(
			JSON.stringify({
				blockUserId: 0,
				gender: 0,
				giftId: 0,
				isExpensive: false,
				totalLikes: 0,
				message: "leavestream",
				messageType: 101,
				mutedUserId: 0,
				senderAvatar: "",
				senderDisplayName: this.getDisplayName(),
				senderUserId: this.getUserId(),
				senderUserName: this.getUserName(),
				streamDuration: 0,
				totalReceivedStars: 0,
				totalViewers: 0,
				licenseKey: this.getLicenseKey(),
				channel: chann
			})
		);
		EventManager.publish(chann, "__LostedConnection");
	}
	
	_sendToServer(mes) {
		console.log("_sendToServer... \n", mes);
		if (this.getClient().readyState !== 1) {
			return;
		}
		this.getClient().send(mes);
	}
	
	SendMessageToGroup(mess) {
		console.log("SendMessageToGroup...");
		if (this.getClient().readyState !== 1) {
			return;
		}
		this._sendToServer(
			JSON.stringify(Object.assign({
					slug: this.getChannelSubscribed(),
					streamDuration: 1,
					totalViewers: 1,
					totalLikes: 1,
					totalReceivedStars: 1,
					gender: 1,
					recordedTime: 1
				},
				mess,
				{
					senderAvatar: "https://production-appsters-clients.s3-ap-southeast-1.amazonaws.com/profile_image_default/user.jpg",
					senderDisplayName: this.getDisplayName(),
					senderUserId: this.getUserId(),
					senderUserName: this.getUserName(),
					licenseKey: this.getLicenseKey(),
					channel: this.getChannelSubscribed()
				}))
		);
	}
	
	ReceiveMessage(callbackFunc) {
		console.log("ReceiveMessage...");
		if (callbackFunc != null && callbackFunc != undefined) {
			this.getClient().onmessage = function (evt) {
				callbackFunc(evt.data);
			};
		}
	}
	
	async DisconnectConnection() {
		this.getClient().close();
	}
	
	getClient() {
		console.log("getClient...");
		return this._client;
	}
	
	getXchatToken() {
		console.log("getXchatToken...");
		return this._xchatToken;
	}
	
	getUserName() {
		console.log("getUserName...");
		return this._userName;
	}
	
	getUserId() {
		console.log("getUserId...");
		return this._userId;
	}
	
	getDisplayName() {
		return this._displayName;
	}
	
	getChannelSubscribed() {
		return this._channelSubscribed;
	}
	
	getLicenseKey() {
		return this._licenseKey;
	}
	
	setClient(value) {
		this._client = value;
	}
	
	setXchatToken(value) {
		this._xchatToken = value;
	}
	
	setUserName(value) {
		this._userName = value;
	}
	
	setDisplayName(value) {
		this._displayName = value;
	}
	
	setChannelSubscribed(value) {
		this._channelSubscribed = value;
	}
	
	setConnected(value) {
		this._connected = value;
	}
	
	setLicenseKey(value) {
		this._licenseKey = value;
	}
}
