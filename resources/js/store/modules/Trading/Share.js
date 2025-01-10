function initialState() {
    return {
        config: { watchlist: [], sources: [] },
        groups: [],
        symbols: [],
        prices: [],
        tools: {},
        isLoading: false,
        filterProcess: 0,
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
                    resolve(response.data.index);
                    setTimeout(() => {
                        commit("setChartData", response.data);
                        commit("setLoading", false);
                    }, 0);
                });
        });
    },
    initChart({ commit, dispatch, getters, state, rootGetters }) {
        commit("setLoading", true);
        return new Promise((resolve, reject) => {
            axios
                .get("trading/share/init-chart", { noLoading: true })
                .then((response) => {
                    commit("setConfig", response.data);
                    commit("setLoading", false);
                    resolve();
                });
        });
    },
    setSource({ commit, dispatch, getters, state, rootGetters }, source) {
        commit("setSource", source);
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "trading/share/set-source",
                    { source },
                    { noLoading: true }
                )
                .then((response) => resolve());
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
        commit("setLoading", true);
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "trading/share/get-symbols",
                    { group },
                    { noLoading: true }
                )
                .then((response) => {
                    commit("setSymbols", response.data);
                    commit("setLoading", false);
                    resolve();
                });
        });
    },
    filterSymbols({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("trading/share/filter", param).then((response) => {
                commit("setFilterProcess", 0);
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
    changeWatchlist({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/share/change-watchlist", param, {
                    noLoading: true,
                })
                .then((response) => {
                    if (param.group === "WATCH") {
                        commit("setSymbols", response.data.watchlist);
                    }
                    resolve(response.data.watchlist);
                });
        });
    },
    getTools({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/share/get-tools", param, { noLoading: true })
                .then((response) => {
                    commit("setTools", response.data);
                    resolve();
                });
        });
    },
    drawTools({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/share/draw-tools", param, { noLoading: true })
                .then((response) => {
                    resolve();
                });
        });
    },

    setFilterProcess({ commit }, param) {
        commit("setFilterProcess", param);
    },
    resetState({ commit }) {
        commit("resetState");
    },
};

const mutations = {
    setChartData(state, data) {
        state.prices = data.prices;
        state.tools = data.tools;
    },
    setTools(state, data) {
        state.tools = data;
    },
    setConfig(state, data) {
        state.config = data;
    },
    setSource(state, data) {
        state.config.source = data;
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
    setFilterProcess(state, data) {
        state.filterProcess = data;
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
