function initialState() {
    return {
        config: {},
        status: { connection: true },
        chartData: [],
        isChartLoading: false,
    };
}

const getters = {
    config: (state) => state.config,
    status: (state) => state.status,
    chartData: (state) => state.chartData,
    isChartLoading: (state) => state.isChartLoading,
};

const actions = {
    getChartData({ commit, dispatch, getters, state, rootGetters }, chartDate) {
        commit("setChartLoading", true);
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "order-chart",
                    { date: chartDate },
                    { noLoading: true, crypto: true }
                )
                .then((response) => {
                    commit("setChartData", response.data);
                    commit("setChartLoading", false);
                    resolve();
                });
        });
    },
    getStatus({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "https://smartpro.vps.com.vn/handler/core.vpbs",
                    {
                        group: "Q",
                        user: state.config.vpsCode,
                        session: state.config.vpsSession,
                        c: "H",
                        data: {
                            type: "string",
                            cmd: "Web.Portfolio.PortfolioStatus2",
                            p1: state.config.vpsCode + "8",
                        },
                    },
                    { noLoading: true }
                )
                .then((response) => {
                    const status = {
                        connection: response.data.rc == 1,
                        position:
                            response.data.rc == 1
                                ? +response.data.data[0].net
                                : 0,
                    };
                    commit("setStatus", status);
                    resolve();
                });
        });
    },
    getStatus1({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "order-chart/get-status",
                    {},
                    { noLoading: true, crypto: true }
                )
                .then((response) => {
                    commit("setStatus", response.data);
                    resolve();
                });
        });
    },
    getConfig({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios
                .post("order-chart/get-config", {}, { crypto: true })
                .then((response) => {
                    commit("setConfig", response.data);
                    resolve();
                });
        });
    },
    setConfig({ commit, dispatch, getters, state, rootGetters }, chartDate) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "order-chart/set-config",
                    { date: chartDate },
                    { noLoading: true, crypto: true }
                )
                .then((response) => {
                    commit("setChartData", response.data);
                    resolve();
                });
        });
    },
    executeOrder({ commit, dispatch, getters, state, rootGetters }, data) {
        commit("setChartLoading", true);
        return new Promise((resolve, reject) => {
            axios
                .post("order-chart/execute-order", data, {
                    noLoading: true,
                    crypto: true,
                    notify: true,
                })
                .then((response) => {
                    commit("setChartLoading", false);
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
    setStatus(state, data) {
        state.status = data;
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
