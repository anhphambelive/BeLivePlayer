const state = {
    isMobileLayout: false,
};

const getters = {
    isMobileLayout(state) {
        return state.isMobileLayout;
    },
};

const mutations = {
    UPDATE_MOBILE_BROWSER_LAYOUT(state, isMobileLayout) {
        state.isMobileLayout = isMobileLayout;
    },
};

const actions = {
    updateMobileBrowserLayout: ({ commit }, isMobileLayout) => {
        commit("UPDATE_MOBILE_BROWSER_LAYOUT", isMobileLayout);
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
