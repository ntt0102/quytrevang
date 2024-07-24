function initialState() {
    return {
        symbols: {},
        chart: {},
        isChartLoading: false,
    };
}
const getters = {};

const actions = {
    getChartData({ commit, dispatch, getters, state, rootGetters }, params) {
        commit("setChartLoading", true);
        return new Promise((resolve, reject) => {
            axios
                .get("trading/stock", { params, noLoading: true })
                .then((response) => {
                    commit("setChartData", response.data);
                    commit("setChartLoading", false);
                    resolve(response.data.vnindex);
                });
        });
    },
    initChart({ commit, dispatch, getters, state, rootGetters }, params) {
        commit("setChartLoading", true);
        return new Promise((resolve, reject) => {
            axios
                .get("trading/stock/init-chart", {
                    params,
                    noLoading: true,
                })
                .then((response) => {
                    commit("setChartData", response.data.chart);
                    commit("setChartLoading", false);
                    resolve(response.data);
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
                .get("trading/stock/get-symbols", { noLoading: true })
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
            axios.post("trading/stock/filter", param).then((response) => {
                resolve(response.data);
            });
        });
    },
    removeFilterList({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/stock/remove-filter-list", param, {
                    noLoading: true,
                })
                .then((response) => {
                    dispatch("getSymbols");
                    resolve();
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
