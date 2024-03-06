function initialState() {
    return {
        charts: { page: 0, period: "day" },
        data: [],
        summary: {},
        opening: {},
    };
}

function createAccProfit(data) {
    return data.reduce((carry, item) => {
        item.accProfit =
            item.profit + (!!carry.length ? carry.at(-1).accProfit : 0);
        carry.push(item);
        return carry;
    }, []);
}

const getters = {};

const actions = {
    getData({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/statistic", null, { noLoading: true })
                .then((response) => {
                    commit("setData", response.data);
                    resolve();
                });
        });
    },
    getSummary({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("trading/statistic/summary", null).then((response) => {
                commit("setSummary", response.data);
                resolve();
            });
        });
    },
    getOpening({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("trading/statistic/opening", null).then((response) => {
                commit("setOpening", response.data);
                resolve();
            });
        });
    },
    getProfitChart({ commit, dispatch, getters, state, rootGetters }, period) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "trading/statistic/profit-chart",
                    { period: period, page: 1 },
                    { noLoading: true }
                )
                .then((response) => {
                    response.data.data = createAccProfit(response.data.data);
                    commit("setChart", response.data);
                    resolve();
                });
        });
    },
    lazyLoad({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "trading/statistic/profit-chart",
                    {
                        period: state.charts.period,
                        page: state.charts.page + 1,
                    },
                    { noLoading: true }
                )
                .then((response) => {
                    if (response.data.page > state.charts.page) {
                        let chartData = [
                            ...response.data.data,
                            ...JSON.parse(JSON.stringify(state.charts.data)),
                        ];
                        response.data.data = createAccProfit(chartData);
                        commit("setChart", response.data);
                    }
                    resolve();
                });
        });
    },
    save({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("trading/statistic/save", { changes: param.changes })
                .then((response) => {
                    resolve();
                    dispatch("getData");
                    // dispatch("getChart", state.charts.period);
                });
        });
    },
    resetState({ commit }) {
        commit("resetState");
    },
};

const mutations = {
    setData(state, data) {
        state.data = data;
    },
    setChart(state, data) {
        state.charts = data;
    },
    setSummary(state, data) {
        state.summary = data;
    },
    setOpening(state, data) {
        state.opening = data;
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
