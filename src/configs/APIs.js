import { ENDPOINT_SERVER } from "./SDK";

export const SDK_API = {
    //Landing page
    LANDING_PAGE: `${ENDPOINT_SERVER}/landing-page`,
    // User:
    GUEST_LOGIN: `${ENDPOINT_SERVER}/users/guest-login`,
    CHECK_LOGIN: `${ENDPOINT_SERVER}/users/check-login`,
    PHONE_REGISTER: `${ENDPOINT_SERVER}/users/register-phone`,
    PHONE_LOGIN: `${ENDPOINT_SERVER}/users/login-phone`,
    LOGOUT: `${ENDPOINT_SERVER}/users/logout`,
    VERIFY_PHONE: `${ENDPOINT_SERVER}/users/verify-phone`,
    VERIFY_OTP: `${ENDPOINT_SERVER}/users/verify-otp`,
    SEND_OTP: `${ENDPOINT_SERVER}/users/send-otp`,
    FORGOT_PASSWORD: `${ENDPOINT_SERVER}/users/forgot-password`,
    RESET_PASSWORD: `${ENDPOINT_SERVER}/users/reset-password`,
    RANDOM_CHANNEL_KEY: `${ENDPOINT_SERVER}/users/randomise`,

    // Stream
    CREATE_STREAM: `${ENDPOINT_SERVER}/streams/create`,
    BEGIN_STREAM: `${ENDPOINT_SERVER}/streams/begin`,
    UPDATE_VIEW_COUNT_STREAM: `${ENDPOINT_SERVER}/streams/update-viewcount`,
    END_STREAM: `${ENDPOINT_SERVER}/streams/end`,
    GET_STATISTIC_STREAM: `${ENDPOINT_SERVER}/streams/statistic`,
    GET_DETAIL_STREAM: `${ENDPOINT_SERVER}/streams/detail`,
    GET_DETAIL_STREAM_PASSWORD: `${ENDPOINT_SERVER}/streams/detail/pwd`,
    GET_DETAIL_CHANNEL: `${ENDPOINT_SERVER}/streams/detail/web`,
    GET_RESUME_DETAIL_STREAM: `${ENDPOINT_SERVER}/streams/resume-detail`,
    RECORD_STREAM: `${ENDPOINT_SERVER}/streams/recording`,
    LEAVE_STREAM: `${ENDPOINT_SERVER}/streams/leave-stream`,
    LIKE_STREAM: `${ENDPOINT_SERVER}/streams/like`,
    GET_PINNED_MESSAGE: `${ENDPOINT_SERVER}/streams/pinned`,
    GET_PRODUCTS_IN_STREAM: `${ENDPOINT_SERVER}/streams/products`,

    CHANNEL_STREAM: `${ENDPOINT_SERVER}/streams/channel-detail`,
    LOCK_UNLOCK_ROOM: `${ENDPOINT_SERVER}/streams/lock`,
    KICK_VIEWER: `${ENDPOINT_SERVER}/streams/kick-viewer`,
    UN_KICK_VIEWER: `${ENDPOINT_SERVER}/streams/unkick-viewer`,

    DELETE_STREAM: `${ENDPOINT_SERVER}/streams/delete`,
    VIEWER_IN_STREAM: `${ENDPOINT_SERVER}/streams/users`,

	/**
	 * Users
	 */
    UPDATE_PROFILE: `${ENDPOINT_SERVER}/users/edit-profile`,
    USER_STREAMS: `${ENDPOINT_SERVER}/users/streams`,
    DELETE_PHOTO_PROFILE: `${ENDPOINT_SERVER}/users/delete-profile-photo`,
    BELIVE_LOGIN: `${ENDPOINT_SERVER}/users/belive-login`,
    BELIVE_REGISTER: `${ENDPOINT_SERVER}/users/belive-register`,

    /**
     * Configs:
     */
    NAUGHTY_WORDS: `${ENDPOINT_SERVER}/settings/naughty-words`,


    //Suntec acquire token API
    SUNTEC_ACQUIRE_TOKEN: "https://staging.sunteccity.com.sg/ver16/index.php/partnersv1/acquiretoken"
};
