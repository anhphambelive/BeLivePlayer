const state = {
    channelStream: null,
    pinnedMessage: null,
    streamStatistic: {
        // default data
        AdminDisplayName: "",
        Combo: 0,
        DurationTime: 0,
        GiftColor: 0,
        GiftId: "",
        GiftImageLink: "",
        GiftName: "",
        IsComboGift: false,
        IsExpensive: false,
        IsLiked: false,
        Message: "",
        ProfilePic: "",
        RankingList: [],
        TotalReceivedStars: 0,
        VotingScores: 0,
        isGroup: false,
        luckyResult: -1,
        mGiftCombo: 0,
        streamTitleColor: "",
        x: 0,
        y: 0,
        TotalLikes: 0,
        TotalViewers: 0,
        Slug: ""
    },
    streamProducts: [],
    isShowStreamProducts: false,
    isKickedUser: false,
};

const getters = {
    channelStream(state) {
        return state.channelStream;
    },
    pinnedMessage(state) {
        return state.pinnedMessage;
    },
    streamStatistic(state) {
        return state.streamStatistic;
    },
    streamProducts(state) {
        return state.streamProducts;
    },
    isShowStreamProducts(state) {
        return state.isShowStreamProducts;
    },
    
    isKickedUser(state) {
        return state.isKickedUser;
    }
};

const mutations = {
    UPDATE_CHANNEL_STREAM_DATA(state, channelStream) {
        if (!channelStream) {
            state.channelStream = null;
        }
        else if (state.channelStream) {
            state.channelStream = Object.assign(state.channelStream, channelStream);
        }
        else {
            state.channelStream = Object.assign({}, channelStream);
        }
    },
    
    UPDATE_PINNED_MESSAGE(state, message) {
        state.pinnedMessage = message;
    },
    
    UPDATE_STREAM_STATISTIC(state, streamStatistic) {
        state.streamStatistic = Object.assign(state.streamStatistic, streamStatistic);
    },
    
    UPDATE_STREAM_PRODUCTS(state, streamProducts) {
        state.streamProducts = streamProducts.sort(function (a, b) {
            return a.orderIndex - b.orderIndex;
        });
    },
    
    RESORT_STREAM_PRODUCTS(state, sortProduct) {
        let productSorted = state.streamProducts.filter(function (product, index) {
            return parseInt(product.id) === parseInt(sortProduct.productId);
        });
        if (productSorted.length) {
            let oldIndex = productSorted[0].orderIndex;
            if (oldIndex > sortProduct.newIndex) {
                state.streamProducts.map(function (product, index) {
                    if (product.orderIndex <= oldIndex && product.orderIndex > sortProduct.newIndex) {
                        return product.orderIndex++;
                    }
                });
            }
            else if (oldIndex < sortProduct.newIndex) {
                state.streamProducts.map(function (product, index) {
                    if (product.orderIndex >= oldIndex && product.orderIndex < sortProduct.newIndex) {
                        return product.orderIndex--;
                    }
                });
            }
    
            commit("UPDATE_STREAM_PRODUCTS", state.streamProducts);
        }
    },
    
    UPDATE_STATE_LIST_STREAM_PRODUCTS(state, isShowStreamProducts) {
        state.isShowStreamProducts = isShowStreamProducts;
    },
    
    UPDATE_STATE_KICK_USER(state, isKickedUser) {
        state.isKickedUser = isKickedUser;
    },
};

const actions = {
    updateChannelStreamData: ({commit}, channelStream) => {
        commit("UPDATE_CHANNEL_STREAM_DATA", channelStream);
    },
    
    updatePinnedMessage: ({commit}, message) => {
        commit("UPDATE_PINNED_MESSAGE", message);
    },
    
    updateStreamStatistic: ({commit}, streamStatistic) => {
        commit("UPDATE_STREAM_STATISTIC", streamStatistic);
    },
    
    updateStreamProducts: ({commit}, streamProducts) => {
        commit("UPDATE_STREAM_PRODUCTS", streamProducts);
    },
    
    resortStreamProducts: ({commit}, sortProduct) => {
        commit("RESORT_STREAM_PRODUCTS", sortProduct);
    },
    
    updateStateListStreamProducts: ({commit}, isShowStreamProducts) => {
        commit("UPDATE_STATE_LIST_STREAM_PRODUCTS", isShowStreamProducts);
    },
    
    updateStateKickUser: ({commit}, isKickedUser) => {
        commit("UPDATE_STATE_KICK_USER", isKickedUser);
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
