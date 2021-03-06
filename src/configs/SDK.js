export const LIVE_SERVER = {
	SDP_URL: BELIVESDK_WEB_APP_SDP_URL,
	APP_NAME: BELIVESDK_WEB_APP_NAME
};

export const ENDPOINT_SERVER = BELIVESDK_WEB_APP_ENDPOINT;
export const BASE_URL = BELIVESDK_WEB_APP_BASE_URL;

export const STATUS_RESPONSES = {
	USER_BLOCKED_BY_HOST: 1309,
	USER_BANNED_BY_ADMIN: 1120,
	USERNAME_HAS_BEEN_TAKEN: 759,
	USER_NOT_FOUND: 652,
	SUCCESS: 1,
	PRIVATE_ROOM: 798,
	USER_LOGGED_ANOTHER_DEVICE: 1341,
};

export const STREAM_MODES = {
	SIMPLE: 0,
	ADVANCED: 1
};

export const STATUS_REMOTE_STREAM = {
	PLAYING: "PLAYING",
	STREAMING: "STREAMING",
	PAUSED: "PAUSED",
	STOPPED: "STOPPED",
	NEW: "NEW",
	END: "END",
};

export const STATUS_VIDEO = {
	LIVE: 1,
	RECORDED: 2,
};

export const DEVICE_TYPES = {
	ANDROID: "0",
	IOS: "1",
	WEB: "2"
};

export const DEVICE_UDID = {
	WEB: "web"
};

export const MOBILE_OS = {
	ANDROID: "ANDROID",
	iOS: "iOS",
	WINDOW_PHONE: "Windows Phone",
	UN_KNOWN: "unknown",
};

export const MOBILE_APP_URL = {
	ANDROID: {
		DOWNLOAD_URL: "https://play.google.com/store/apps/details?id=sg.belive.sdk.app",
		APP_INSTALLED_URL: "belive://",
	},
	iOS: {
		DOWNLOAD_URL: "",
		APP_INSTALLED_URL: "",
	},
};

export const VALIDATION_STREAM_FORM = {
	MIN_LENGTH_CHANNEL_NAME: 3,
	MAX_LENGTH_CHANNEL_NAME: 99,
	MIN_LENGTH_CHANNEL_PASSWORD: 7,
};

export const LAYOUT_CHAT_BOX_MODES = {
	CHAT: "CHAT",
	WATCHING_USERS: "WATCHING_USERS"
};

export const VIDEO_STREAM_ID = {
	SCREEN_SHARE: 1
};
