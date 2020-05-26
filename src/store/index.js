import Vue from "vue";
import Vuex from "vuex";
import sdk from "./modules/sdk";
import general from "./modules/general";
import channel from "./modules/channel";
import state from "./state.js";
import getters from "./getters.js";
import mutations from "./mutations.js";
import actions from "./actions.js";

Vue.use(Vuex);

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	modules: {
		sdk: sdk,
		general: general,
		channel: channel,
	}
});
