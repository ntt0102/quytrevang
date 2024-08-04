function initialState() {
    return {
        status: { connection: true, position: 0, pending: false },
        config: {},
        tools: [],
        chartData: [],
        isChartLoading: false,
    };
}

const getters = {};

const actions = {
    getChartData({ commit, dispatch, getters, state, rootGetters }, chartDate) {
        commit("setChartLoading", true);
        return new Promise((resolve, reject) => {
            axios
                .get("trading/order", {
                    params: { date: chartDate },
                    noLoading: true,
                })
                .then((response) => {
                    commit("setChartData", response.data);
                    commit("setChartLoading", false);
                    resolve();
                });
        });
    },
    initChart({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios
                .get("trading/order/init-chart", { noLoading: true })
                .then((response) => {
                    commit("setInitChart", response.data);
                    resolve();
                });
        });
    },
    getTools({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios
                .get("trading/order/get-tools", { noLoading: true })
                .then((response) => {
                    commit("setTools", response.data);
                    resolve();
                });
        });
    },
    loginVps({ commit, dispatch, getters, state, rootGetters }, otpCode) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/order/login-vps", { otpCode })
                .then((response) => {
                    commit("setStatus", response.data.status);
                    resolve(response.data.isOk);
                });
        });
    },
    getStatus({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios
                .get("trading/order/get-status", { noLoading: true })
                .then((response) => {
                    commit("setStatus", response.data);
                    resolve();
                });
        });
    },
    getAccountInfo({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.get("trading/order/get-account-info").then((response) => {
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
    closePosition({ commit, dispatch, getters, state, rootGetters }, id) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/order/close-position", { id })
                .then((response) => {
                    resolve(response.data);
                });
        });
    },
    drawTools({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/order/draw-tools", param, { noLoading: true })
                .then((response) => {
                    resolve();
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
    export({ commit, dispatch, getters, state, rootGetters }, chartDate) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/order/export", { date: chartDate })
                .then((response) => {
                    if (response.headers["content-type"].includes("text/csv")) {
                        var fileURL = window.URL.createObjectURL(
                            new Blob([response.data])
                        );
                        var fileLink = document.createElement("a");
                        fileLink.href = fileURL;
                        const filename = response.headers["content-disposition"]
                            .split("=")
                            .pop();
                        fileLink.setAttribute("download", filename);
                        document.body.appendChild(fileLink);
                        fileLink.click();
                    }
                    resolve();
                });
        });
    },
    loginDnse({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.post("trading/order/login-dnse", null).then((response) => {
                resolve();
            });
        });
    },
    setChartLoading({ commit }, state) {
        commit("setChartLoading", state);
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
    setOrderStatuses(state, data) {
        state.copyists = data;
    },
    setInitChart(state, data) {
        state.config = data.config;
        state.tools = data.tools;
    },
    setTools(state, data) {
        state.tools = data;
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
