export const LAYOUT_MODES = {
    VIEW: "view",
    EDIT: "edit",
    LOGIN: "login",
    SIGN_UP: "sign_up",
    FORGOT_PASSWORD: "forgot_password",
};

export const FORGOT_PASSWORD_STEPS = {
    INPUT_PHONE: "fgp_input_phone",
    VERIFY_OTP: "reset_password_verify_otp",
    INPUT_NEW_PASSWORD: "fgp_input_new_password",
};

export const LOGIN_STEPS = {
    INPUT_LOGIN_FORM: "login_input_phone",
    VERIFY_OTP: "login_verify_otp",
    INPUT_NEW_PASSWORD: "login_input_new_password",
};

export const SIGN_UP_STEPS = {
    INPUT_SIGN_UP_FORM: "sign_up_input_phone",
    VERIFY_OTP: "sign_up_verify_otp",
    INPUT_DISPLAY_NAME_PASSWORD: "sign_up_input_display_name_password",
};

export const BG_COLORS = [
    "#14ACA0",
    "#7EDEF6",
    "#FBC597",
    "#FD7F8B",
    "#AEA1E9",
    "#DCAE9E",
    "#79D3BA",
    "#71C4E2",
    "#FFD275",
    "#F894AE",
    "#B8C2FF",
    "#9A745D",
    "#7DB4AE",
    "#669DED",
    "#FF9E7B",
    "#DD6555",
    "#AD81A2",
    "#5E4A40"
];

export const RESOLUTION_ARR = { // https://docs.agora.io/en/Interactive%20Broadcast/API%20Reference/web/interfaces/agorartc.stream.html#setvideoprofile
    "120p": "120p_1",
    "360p": "360p_4",
    "480p": "480p_1",
    "720p": "720p_3"
};

export let agoraOptions = {
    appID: "0d1ca1df6ee04bca9fac4f27a4b9e264", // waylive
    // appID: "7109fe3cb3a14ee98f8d039d8a325d4d",
    channel: "Agora Channel",
    uid: null,
    token: null
};

export const MEDIA_STREAMS = {
    VIDEO: "video",
    AUDIO: "audio",
};

export const IS_USE_SDK = true;

export const ROUTES_NEED_AUT = {
    LIBRARY: "MyLibrary",
    PROFILE: "Profile",
    ANALYTICS: "Analytics",
    ANALYTIC_STREAM: "AnalyticStream",
    LIVE_SDK: "LiveStream",
    LIVE_AGORA: "LiveStreamAgora",
};

export const SUNTEC_CONFIG = {
    SSO_JS_URL: "https://staging.sunteccity.com.sg/ssopopup/sso.js",
    SSO_CSS_URL: "https://staging.sunteccity.com.sg/ssopopup/sso.css",
    SUNTEC_PRODUCT_TEMPLATE: "https://staging.sunteccity.com.sg/ver16/index.php/partnersv1/product?ssoToken=<token>&productUrl=<productUrl>&referrerUrl=<referrerUrl>&isLive=<isLive>&durationLeft=<durationLeft>"
}

export const ALLOW_GUEST_CHAT = true;
export const ALLOW_RANDOM_COLOR = true;
export const ALLOW_CHAT_ON_RECORDED_VIDEO = false;
export const ALLOW_GUEST_JOINED_MESSAGE = false;
export const EXPIRED_TIME_RENEW_SSO = 3;

