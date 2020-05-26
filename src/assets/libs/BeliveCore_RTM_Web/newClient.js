import {BeliveRtmClient} from "./beliveRTM.js";

import EventManager from "./eventManager.js";

let channelWantToJoin = "channelHello";
let cl = new BeliveRtmClient("18.140.206.180:1010", channelWantToJoin);
setTimeout(() => {
	cl.init();
}, 1000);

EventManager.subscribe(channelWantToJoin, function (dt) {
	console.log("EventManager.subscribe('" + channelWantToJoin + "')");
	console.info(dt);
	console.info(JSON.parse(dt));
});

EventManager.subscribe("hello111111", function (user) {
	console.log("EventManager.subscribe('hello111111')");
	console.info(dt);
	console.info(JSON.parse(dt));
});
