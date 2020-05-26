import {BG_COLORS} from "../../configs/Settings";

const state = {
	user: {
		color: null,
		displayName: null,
        accessToken: null,
		language: 0,
        channelKey: "your-channel",
		rank: -1,
		userId: 0,
		userImage: null,
		hasAvatar: false,
		avatarColor: null,
		userName: null,
		signInId: null,
		guestId: 0,
		guestName: null
	}
};

const getters = {
	user(state) {
		return state.user;
	}
};

const mutations = {
	USER_LOGIN(state, user) {
		state.user.accessToken =
			user && user.accessToken
				? user.accessToken
				: null;
		state.user.userName =
			user && user.userInfo && user.userInfo.userName
				? user.userInfo.userName
				: null;
		state.user.channelKey =
			user && user.userInfo && user.userInfo.channelKey
				? user.userInfo.channelKey
				: "your-channel";
				
		state.user.signInId =
			user && user.userInfo && user.userInfo.signInId
				? user.userInfo.signInId
				: null;
				
		state.user.displayName =
			user && user.userInfo && user.userInfo.displayName
				? user.userInfo.displayName
				: null;

		state.user.avatarColor = user && user.avatarColor && user.avatarColor !== ""
			? user.avatarColor
			: BG_COLORS[0];

		state.user.userId =
			user && user.userInfo && user.userInfo.userId ? user.userInfo.userId : 0;
		state.user.color =
			user && user.userInfo && user.userInfo.color ? user.userInfo.color : null;
		state.user.rank =
			user && user.userInfo && user.userInfo.rank ? user.userInfo.rank : -1;
		state.user.language =
			user && user.userInfo && user.userInfo.language
				? user.userInfo.language
				: null;

		state.user.hasAvatar =
			user && user.userInfo && user.userInfo.userImage !== ""
				? true : false;
				
		state.user.userImage =
			user && user.userInfo && user.userInfo.userImage !== ""
				? user.userInfo.userImage
				: (state.user.userId ? "../../static/media/suntec.png" : "");

		// Guest:
		state.user.guestId = user && user.guestId ? user.guestId : 0;
		state.user.guestName = user && user.userName ? user.userName : null;
	},

	USER_LOGOUT(state, user) {
		state.user.accessToken = null;
		state.user.userName = null;
		state.user.channelKey = null;
		state.user.displayName = null;
		state.user.userImage = null;
		state.user.hasAvatar = false;
		state.user.userId = null;
		state.user.guestId = null;
		state.user.color = null;
		state.user.avatarColor = user && user.avatarColor && user.avatarColor !== ""
			? user.avatarColor
			: BG_COLORS[0];
		state.user.rank = -1;
		state.user.language = 0;

		// Guest:
		state.user.guestId = user && user.guestId ? user.guestId : 0;
		state.user.guestName = user && user.userName ? user.userName : null;
	}
};

const actions = {
	userLogin: ({commit}, user) => {
		localStorage.removeItem("currentUser");
		localStorage.setItem("currentUser", JSON.stringify(user));
		let i = Math.round(Math.random() * 17);
		user.avatarColor = BG_COLORS[i];
		commit("USER_LOGIN", user);
	},
	userLogout: ({commit}, user) => {
		localStorage.removeItem("currentUser");
		localStorage.setItem("currentUser", JSON.stringify(user));
		let i = Math.round(Math.random() * 17);
		user.avatarColor = BG_COLORS[i];
		commit("USER_LOGOUT", user);
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};
