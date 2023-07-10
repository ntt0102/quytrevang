function initialState() {
    return {
        config: {},
        status: { connection: true, position: 0 },
        chartData: [],
        isChartLoading: false,
        copyists: [],
        shark: null,
    };
}

const getters = {};

const actions = {
    getChartData({ commit, dispatch, getters, state, rootGetters }, chartDate) {
        commit("setChartLoading", true);
        return new Promise((resolve, reject) => {
            axios
                .post("trading/order", { date: chartDate }, { noLoading: true })
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
                .post("trading/order/get-status", {}, { noLoading: true })
                .then((response) => {
                    commit("setStatus", response.data);
                    resolve();
                });
        });
    },
    getConfig({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/order/get-config", {}, { noLoading: true })
                .then((response) => {
                    commit("setConfig", response.data);
                    resolve();
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
    resetState({ commit }) {
        commit("resetState");
    },
};

const mutations = {
    setChartData(state, data) {
        state.chartData = data.reduce(
            (c, item, index) => {
                const prevPrice = c.price.length
                    ? c.price.slice(-1)[0].value
                    : item.price;
                let isShark = false;
                if (item.volume >= 150) {
                    if (
                        state.shark != null &&
                        index - state.shark.index <= 4 &&
                        item.price >= state.shark.price &&
                        item.volume > state.shark.volume &&
                        state.shark.volume / item.volume > 0.8 &&
                        (item.price - prevPrice) * state.shark.side > 0
                    )
                        isShark = true;

                    state.shark = {
                        side: item.price - prevPrice,
                        index: index,
                        price: item.price,
                        volume: item.volume,
                    };
                }
                c.price.push({ time: item.time, value: item.price });
                c.volume.push({
                    time: item.time,
                    value: item.volume < 1000 ? item.volume : 0,
                    color:
                        item.price > prevPrice
                            ? isShark
                                ? "lime"
                                : "green"
                            : item.price < prevPrice
                            ? isShark
                                ? "red"
                                : "darkred"
                            : "#CCCCCC",
                });
                return c;
            },
            { price: [], volume: [] }
        );
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
