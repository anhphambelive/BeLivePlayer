const {
	LogInRequest,
	ChannelStreamRequest,
	Message,
	SubcribeChannelRequest,
	LogOutRequest,
	SendChannelMessageRequest,
	LogInResponse,
	LogOutResponse,
	SubcribeChannelResponse,
	ChannelStreamResponse,
	SendChannelMessageResponse,
	RtmClient,
	RtmMessage
} = require("./BeliveRTM_pb.js");
const {BeliveRtmClient} = require("./BeliveRTM_grpc_web_pb.js");

class BeliveRtmClientJs {
	// var _client = undefined
	// var _xchatToken = ""
	// var _userName = ""
	// var _displayName = ""
	// var _channelSubscribed = ""
	
	constructor(host, username, displayname, channel) {
		this._client = new BeliveRtmClient(host);
		this._xchatToken = "";
		this._userName = username;
		this._displayName = displayname;
		this._channelSubscribed = channel;
		console.log("what the fuck");
	}
	
	LogIn() {
		// simple unary call
		var request = new LogInRequest();
		var rtmClient = new RtmClient();
		var id =
			"_" +
			Math.random()
				.toString(36)
				.substr(2, 9);
		rtmClient.setClientuniquename(id);
		rtmClient.setDisplayname("guest" + id);
		request.setRtmclient(rtmClient);
		this.getClient().logIn(request, {}, (err, response) => {
			console.log("logIn ---begin");
			console.info(request);
			console.info(err);
			console.info(response);
			console.info(response.getLoginstatus());
			console.info(response.getToken());
			this.setXchatToken(response.getToken());
			console.log("logIn ---end");
			cl.Subscribe("helloworld");
		});
	}
	
	Subscribe(chann) {
		console.log("Subscribe -----", chann);
		var request = new SubcribeChannelRequest();
		request.setChannel(chann);
		this.getClient().subcribeChannel(
			request,
			{
				"x-chat-token": this.getXchatToken()
			},
			(err, response) => {
				console.log("Subscribe ---begin");
				console.info(request);
				console.info(err);
				console.info(response);
				console.log("Subscribe ---end");
			}
		);
	}
	
	SendMessageToGroup(mess) {
		var request = new proto.v1.ChannelStreamRequest();
		var message = new proto.v1.ChannelStreamRequest.Message();
		var rtmMessage = new proto.v1.RtmMessage();
		rtmMessage.setSender(this.getUserName());
		rtmMessage.setMessagecontent(mess);
		rtmMessage.setMessagetype(0);
		rtmMessage.setSenderdisplayname(this.getDisplayName());
		request.setChannel(this.getChannelSubscribed());
		request.setChannelstreamresponseMessage(message);
		message.setSender(this.getUserName());
		message.setChannelmessagetype(0);
		message.setTimesend(new Date());
		message.setRtmmessage(rtmMessage);
		var stream = this.getClient().channelStream(request, {
			"x-chat-token": this.getXchatToken()
		});
		stream.on("data", (err, response) => {
			console.log("SendMessageToGroup ---begin");
			console.log(err);
			console.log(response.getMessage());
			console.log("SendMessageToGroup ---end");
		});
	}
	
	getClient() {
		return this._client;
	}
	
	getXchatToken() {
		return this._xchatToken;
	}
	
	getUserName() {
		return this._userName;
	}
	
	getDisplayName() {
		return this._displayName;
	}
	
	getChannelSubscribed() {
		return this._channelSubscribed;
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
}

var cl = new BeliveRtmClientJs(
	"http://localhost:8080",
	"khooa",
	"khoa a b c d",
	"helloo"
);
cl.LogIn();
cl.SendMessageToGroup("fucking");
// // server streaming call
// var streamRequest = new RepeatHelloRequest();
// streamRequest.setName('World');
// streamRequest.setCount(5);

// var stream = client.sayRepeatHello(streamRequest, {});
// stream.on('data', (response) => {
// console.log(response.getMessage());
// });

// // deadline exceeded
// var deadline = new Date();
// deadline.setSeconds(deadline.getSeconds() + 1);

// client.sayHelloAfterDelay(request, {deadline: deadline.getTime()},
// (err, response) => {
//  console.log('Got error, code = ' + err.code + ', message = ' + err.message);
// });
