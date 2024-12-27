function initialState() {
    return {
        groups: [],
        symbols: [],
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
                .get("trading/share", { params, noLoading: true })
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
                .get("trading/share/init-chart", {
                    params,
                    noLoading: true,
                })
                .then((response) => {
                    commit("setChartLoading", false);
                    resolve(response.data);
                });
        });
    },
    getGroups({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/share/get-groups", {}, { noLoading: true })
                .then((response) => {
                    commit("setGroups", response.data);
                    resolve();
                });
        });
    },
    getSymbols({ commit, dispatch, getters, state, rootGetters }, group) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "trading/share/get-symbols",
                    { group },
                    { noLoading: true }
                )
                .then((response) => {
                    commit("setSymbols", response.data);
                    resolve();
                });
        });
    },
    filterSymbols({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("trading/share/filter", param).then((response) => {
                resolve(response.data);
            });
        });
    },
    removeFilterList({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/share/remove-filter-list", param, {
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
                .post("trading/share/add-watchlist", param, { noLoading: true })
                .then((response) => {
                    dispatch("getSymbols");
                    resolve();
                });
        });
    },
    deleteWatchlist({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/share/delete-watchlist", param, {
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
                .post("trading/share/draw-tools", param, { noLoading: true })
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
    setGroups(state, data) {
        state.groups = data;
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
