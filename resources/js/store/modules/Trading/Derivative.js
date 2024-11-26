function initialState() {
    return {
        status: { connection: false, position: 0, pending: false },
        config: {},
        tools: [],
        chartData: [],
        chartDate: null,
        isChartLoading: false,
    };
}

const getters = {};

const actions = {
    getChartData({ commit, dispatch, getters, state, rootGetters }, date) {
        commit("setChartLoading", true);
        commit("setChartDate", date);
        return new Promise((resolve, reject) => {
            axios
                .get("trading/derivative", {
                    params: { date },
                    noLoading: true,
                })
                .then((response) => {
                    commit("setChartData", response.data);
                    commit("setChartLoading", false);
                    resolve(!!response.data.price.length);
                });
        });
    },
    initChart({ commit, dispatch, getters, state, rootGetters }) {
        commit("setChartLoading", true);
        return new Promise((resolve, reject) => {
            axios
                .get("trading/derivative/init-chart", { noLoading: true })
                .then((response) => {
                    commit("setInitChart", response.data);
                    commit("setChartLoading", false);
                    resolve();
                });
        });
    },
    setAutoRefresh(
        { commit, dispatch, getters, state, rootGetters },
        autoRefresh
    ) {
        commit("setAutoRefresh", autoRefresh);
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "trading/derivative/set-auto-refresh",
                    { autoRefresh },
                    { noLoading: true }
                )
                .then((response) => resolve());
        });
    },
    getTools({ commit, dispatch, getters, state, rootGetters }) {
        commit("setChartLoading", true);
        return new Promise((resolve, reject) => {
            axios
                .get("trading/derivative/get-tools", { noLoading: true })
                .then((response) => {
                    commit("setTools", response.data);
                    commit("setChartLoading", false);
                    resolve();
                });
        });
    },
    loginVps({ commit, dispatch, getters, state, rootGetters }, otpCode) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/derivative/login-vps", { otpCode })
                .then((response) => {
                    commit("setStatus", response.data.status);
                    resolve(response.data.isOk);
                });
        });
    },
    getStatus({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios
                .get("trading/derivative/get-status", { noLoading: true })
                .then((response) => {
                    commit("setStatus", response.data);
                    resolve();
                });
        });
    },
    getAccountInfo({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios
                .get("trading/derivative/get-account-info")
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
                .post("trading/derivative/execute-order", data, {
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
                .post("trading/derivative/close-position", { id })
                .then((response) => {
                    resolve(response.data);
                });
        });
    },
    drawTools({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/derivative/draw-tools", param, {
                    noLoading: true,
                })
                .then((response) => {
                    resolve();
                });
        });
    },
    report({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.post("trading/derivative/report", null).then((response) => {
                resolve();
            });
        });
    },
    export({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/derivative/export", { date: state.chartDate })
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
            axios
                .post("trading/derivative/login-dnse", null)
                .then((response) => {
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
    setChartDate(state, date) {
        state.chartDate = date;
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
        state.status = data.status;
    },
    setAutoRefresh(state, autoRefresh) {
        state.config.autoRefresh = autoRefresh;
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
