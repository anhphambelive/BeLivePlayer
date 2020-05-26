!(function (e) {
	var t = {};
	
	function s(n) {
		if (t[n]) return t[n].exports;
		var i = (t[n] = {i: n, l: !1, exports: {}});
		return e[n].call(i.exports, i, i.exports, s), (i.l = !0), i.exports;
	}
	
	(s.m = e),
		(s.c = t),
		(s.d = function (e, t, n) {
			s.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: n});
		}),
		(s.r = function (e) {
			"undefined" != typeof Symbol &&
			Symbol.toStringTag &&
			Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}),
				Object.defineProperty(e, "__esModule", {value: !0});
		}),
		(s.t = function (e, t) {
			if ((1 & t && (e = s(e)), 8 & t)) return e;
			if (4 & t && "object" == typeof e && e && e.__esModule) return e;
			var n = Object.create(null);
			if (
				(s.r(n),
					Object.defineProperty(n, "default", {enumerable: !0, value: e}),
				2 & t && "string" != typeof e)
			)
				for (var i in e)
					s.d(
						n,
						i,
						function (t) {
							return e[t];
						}.bind(null, i)
					);
			return n;
		}),
		(s.n = function (e) {
			var t =
				e && e.__esModule
					? function () {
						return e.default;
					}
					: function () {
						return e;
					};
			return s.d(t, "a", t), t;
		}),
		(s.o = function (e, t) {
			return Object.prototype.hasOwnProperty.call(e, t);
		}),
		(s.p = ""),
		s((s.s = 0));
})([
	function (e, t, s) {
		"use strict";
		let n;
		s.r(t);
		var i = (n = new (function () {
			var e = {};
			(this.publish = function (t, s) {
				var n = e[t];
				!1 != !!n &&
				n.forEach(function (e) {
					e.call(this, s);
				});
			}),
				(this.subscribe = function (t, s) {
					var n = e[t];
					!1 == !!n && (n = e[t] = []), n.push(s);
				}),
				(this.unsubscribe = function (t, s) {
					var n = e[t];
					if (!1 != !!n) {
						var i = n.indexOf(s);
						n.splice(i);
					}
				});
		})());
		let r = new (class {
			constructor(e, t) {
				var s =
					"_" +
					Math.random()
						.toString(36)
						.substr(2, 9);
				(this._client = new WebSocket("ws://" + e + "/ws")),
					(this._connected = !1),
					(this._xchatToken = ""),
					(this._userName = s),
					(this._displayName = "guest " + s),
					(this._channelSubscribed = t);
			}
			
			logIn() {
				console.log("LogIn...   ", this._client.readyState),
				this._client.readyState < 1 ||
				this._sendToServer(
					JSON.stringify({
						blockUserId: 0,
						gender: 0,
						giftId: 0,
						isExpensive: !1,
						totalLikes: 0,
						message: "login",
						messageType: 10,
						mutedUserId: 0,
						senderAvatar: "",
						senderDisplayName: this.getDisplayName(),
						senderUserId: 1,
						senderUserName: this.getUserName(),
						streamDuration: 0,
						totalReceivedStars: 0,
						totalViewers: 0
					})
				);
			}
			
			init() {
				console.log("init..."),
					setTimeout(this.logIn(), 1e3),
					setTimeout(this.subscribe(this._channelSubscribed), 1e3);
			}
			
			subscribe(e) {
				console.log("Subscribe...  ", e),
				this.getClient().readyState < 1 ||
				(this._sendToServer(
					JSON.stringify({
						blockUserId: 0,
						gender: 0,
						giftId: 0,
						isExpensive: !1,
						totalLikes: 0,
						message: "joinstream",
						messageType: 100,
						mutedUserId: 0,
						senderAvatar: "",
						senderDisplayName: this.getDisplayName(),
						senderUserId: 1,
						senderUserName: this.getUserName(),
						streamDuration: 0,
						totalReceivedStars: 0,
						totalViewers: 0,
						channel: e
					})
				),
					(this.getClient().onclose = function (t) {
						i.publish(e, "__LostedConnection");
					}),
					(this.getClient().onmessage = function (t) {
						for (var s = t.data.split("\n"), n = 0; n < s.length; n++)
							console.info(e),
								console.info(s[n]),
								console.info(JSON.parse(s[n])),
								i.publish(e, s[n]);
					}));
			}
			
			UnSubscribe(e) {
				console.log("UnSubscribe..."),
				1 === this.getClient().readyState &&
				(this._sendToServer(
					JSON.stringify({
						blockUserId: 0,
						gender: 0,
						giftId: 0,
						isExpensive: !1,
						totalLikes: 0,
						message: "leavestream",
						messageType: 101,
						mutedUserId: 0,
						senderAvatar: "",
						senderDisplayName: this.getDisplayName(),
						senderUserId: 1,
						senderUserName: this.getUserName(),
						streamDuration: 0,
						totalReceivedStars: 0,
						totalViewers: 0,
						channel: e
					})
				),
					i.publish(channel, "__LostedConnection"));
			}
			
			_sendToServer(e) {
				console.log("_sendToServer... \n", e),
				1 === this.getClient().readyState && this.getClient().send(e);
			}
			
			SendMessageToGroup(e) {
				console.log("SendMessageToGroup..."),
				1 === this.getClient().readyState &&
				this._sendToServer(
					JSON.stringify({
						blockUserId: 0,
						gender: 0,
						giftId: 0,
						isExpensive: !1,
						totalLikes: 0,
						message: e,
						messageType: 1,
						mutedUserId: 0,
						senderAvatar: "",
						senderDisplayName: this.getDisplayName(),
						senderUserId: 1,
						senderUserName: this.getUserName(),
						streamDuration: 0,
						totalReceivedStars: 0,
						totalViewers: 0
					})
				);
			}
			
			ReceiveMessage(e) {
				console.log("ReceiveMessage..."),
				null != callBackfun &&
				null != callBackfun &&
				(conn.onmessage = function (t) {
					e(t.data);
				});
			}
			
			getClient() {
				return console.log("getClient..."), this._client;
			}
			
			getXchatToken() {
				return console.log("getXchatToken..."), this._xchatToken;
			}
			
			getUserName() {
				return console.log("getUserName..."), this._userName;
			}
			
			getDisplayName() {
				return this._displayName;
			}
			
			getChannelSubscribed() {
				return this._channelSubscribed;
			}
			
			setClient(e) {
				this._client = e;
			}
			
			setXchatToken(e) {
				this._xchatToken = e;
			}
			
			setUserName(e) {
				this._userName = e;
			}
			
			setDisplayName(e) {
				this._displayName = e;
			}
			
			setChannelSubscribed(e) {
				this._channelSubscribed = e;
			}
			
			setConnected(e) {
				this._connected = e;
			}
		})("18.140.206.180:1010", "channelHello");
		setTimeout(() => {
			r.init();
		}, 1e3),
			i.subscribe("channelHello", function (e) {
				console.log("EventManager.subscribe('channelHello')"),
					console.info(e),
					console.info(JSON.parse(e));
			}),
			i.subscribe("hello111111", function (e) {
				console.log("EventManager.subscribe('hello111111')"),
					console.info(dt),
					console.info(JSON.parse(dt));
			});
	}
]);
