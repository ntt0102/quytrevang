function initialState() {
    return {
        symbols: { hose: [], cash: [], index: [], mix: [], watch: [] },
        status: { connection: true, position: 0, pending: false },
        chartData: [],
        isChartLoading: false,
        copyists: [],
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
                    resolve(response.data);
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
    getStatus({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/order/get-status", {}, { noLoading: true })
                .then((response) => {
                    commit("setStatus", response.data);
                    resolve();
                });
        });
    },
    getAccountInfo({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/order/get-account-info", {}, { noLoading: true })
                .then((response) => {
                    resolve(response.data);
                });
        });
    },
    executeOrder({ commit, dispatch, getters, state, rootGetters }, data) {
        if (!state.status.connection)
            return Promise.resolve({ isOk: false, message: "notConnect" });
        return new Promise((resolve, reject) => {
            commit("setChartLoading", true);
            axios
                .post("trading/order/execute-order", data, {
                    noLoading: true,
                    notify: true,
                })
                .then((response) => {
                    commit("setChartLoading", false);
                    dispatch("getStatus");
                    resolve(response.data);
                });
        });
    },
    getCopyistStatus({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "trading/order/get-copyist-status",
                    {},
                    { noLoading: true }
                )
                .then((response) => {
                    commit("setOrderStatuses", response.data);
                    resolve();
                });
        });
    },
    closePosition({ commit, dispatch, getters, state, rootGetters }, id) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/order/close-position", { id })
                .then((response) => {
                    dispatch("getCopyistStatus");
                    resolve(response.data);
                });
        });
    },
    report({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.post("trading/order/report", null).then((response) => {
                resolve();
            });
        });
    },
    export({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.post("trading/order/export", null).then((response) => {
                resolve();
            });
        });
    },
    cashflow({ commit, dispatch, getters, state, rootGetters }, symbol) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/order/cashflow", { symbol })
                .then((response) => {
                    resolve(response.data);
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
    setOrderStatuses(state, data) {
        state.copyists = data;
    },
    setConfig(state, data) {
        state.config = data;
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
