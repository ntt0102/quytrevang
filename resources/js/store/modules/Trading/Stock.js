function initialState() {
    return {
        symbols: { hose: [], cash: [], index: [], mix: [], watch: [] },
        chart: [],
        isChartLoading: false,
    };
}
const FROM_DATE = moment().subtract(3, "years").unix();
const TO_DATE = moment().unix();
const getters = {};

const actions = {
    getChartData({ commit, dispatch, getters, state, rootGetters }, symbol) {
        commit("setChartLoading", true);
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "trading/stock",
                    { symbol, from: FROM_DATE, to: TO_DATE },
                    { noLoading: true }
                )
                .then((response) => {
                    commit("setChartData", response.data);
                    commit("setChartLoading", false);
                    resolve(response.data.data.price);
                });
        });
    },
    cloneSymbols({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/stock/clone-symbols", {}, { noLoading: true })
                .then((response) => {
                    dispatch("getSymbols");
                    resolve();
                });
        });
    },
    getSymbols({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/stock/get-symbols", {}, { noLoading: true })
                .then((response) => {
                    commit("setSymbols", {
                        ...state.symbols,
                        ...response.data,
                    });
                    resolve();
                });
        });
    },
    filterSymbols({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            if (!param.from) param.from = FROM_DATE;
            if (!param.to) param.to = TO_DATE;
            axios.post("trading/stock/filter", param).then((response) => {
                dispatch("getSymbols");
                resolve(response.data);
            });
        });
    },
    addWatchlist({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/stock/add-watchlist", param, { noLoading: true })
                .then((response) => {
                    dispatch("getSymbols");
                    resolve();
                });
        });
    },
    deleteWatchlist({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/stock/delete-watchlist", param, {
                    noLoading: true,
                })
                .then((response) => {
                    dispatch("getSymbols");
                    resolve();
                });
        });
    },
    drawTools({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/stock/draw-tools", param, { noLoading: true })
                .then((response) => {
                    // dispatch("getSymbols");
                    resolve();
                });
        });
    },

    resetState({ commit }) {
        commit("resetState");
    },
};

const mutations = {
    setChartData(state, data) {
        state.chart = data;
    },
    setChartLoading(state, data) {
        state.isChartLoading = data;
    },
    setSymbols(state, data) {
        state.symbols = data;
    },
    resetState(state) {
        state = Object.assign(state, initialState());
    },
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations,
};
