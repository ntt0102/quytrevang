function initialState() {
    return {
        symbols: { hose: [], cash: [], index: [], mix: [], watch: [] },
        chartData: [],
        isChartLoading: false,
    };
}

const getters = {};

const actions = {
    getChartData({ commit, dispatch, getters, state, rootGetters }, symbol) {
        commit("setChartLoading", true);
        return new Promise((resolve, reject) => {
            const from = moment().subtract(3, "years").unix();
            const to = moment().unix();
            axios
                .post(
                    "trading/stock",
                    { symbol, from, to },
                    { noLoading: true }
                )
                .then((response) => {
                    commit("setChartData", response.data);
                    commit("setChartLoading", false);
                    resolve();
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
            axios
                .post("trading/stock/filter", param, { noLoading: true })
                .then((response) => {
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
    resetState({ commit }) {
        commit("resetState");
    },
};

const mutations = {
    setChartData(state, data) {
        state.chartData = data;
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
