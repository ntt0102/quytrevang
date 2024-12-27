function initialState() {
    return {
        groups: [],
        symbols: [],
        chart: {},
        isLoading: false,
    };
}
const getters = {};

const actions = {
    getChartData({ commit, dispatch, getters, state, rootGetters }, params) {
        commit("setLoading", true);
        return new Promise((resolve, reject) => {
            axios
                .get("trading/share", { params, noLoading: true })
                .then((response) => {
                    commit("setChartData", response.data);
                    commit("setLoading", false);
                    resolve(response.data.vnindex);
                });
        });
    },
    initChart({ commit, dispatch, getters, state, rootGetters }) {
        commit("setLoading", true);
        return new Promise((resolve, reject) => {
            axios
                .get("trading/share/init-chart", { noLoading: true })
                .then((response) => {
                    commit("setLoading", false);
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
        if (!group) return commit("setSymbols", []);
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
    checkSymbol({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("trading/share/check", param).then((response) => {
                resolve(response.data);
            });
        });
    },
    addWatchlist({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/share/add-watchlist", param, { noLoading: true })
                .then((response) => {
                    resolve(response.data);
                });
        });
    },
    deleteWatchlist({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/share/delete-watchlist", {}, { noLoading: true })
                .then((response) => {
                    // dispatch("getSymbols");
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
    setLoading(state, data) {
        state.isLoading = data;
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
