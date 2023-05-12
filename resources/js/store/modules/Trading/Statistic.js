function initialState() {
    return {
        charts: { page: 0, period: "day" },
        data: [],
        summary: {},
        updatedAt: null,
    };
}

function createAccumulatedProfit(data) {
    return data.reduce((carry, item) => {
        item.accumulatedProfit =
            item.profit + (!!carry.length ? carry.at(-1).accumulatedProfit : 0);
        carry.push(item);
        return carry;
    }, []);
}

const getters = {
    // charts: (state) => state.charts,
    // trades: (state) => state.trades,
    // summary: (state) => state.summary,
    // period: (state) => state.charts.period,
    // page: (state) => state.charts.page,
};

const actions = {
    validateDuplicateDate({ state }, param) {
        const oldDate = state.data.find((x) => x.id === param.data.id);
        if (oldDate != undefined) {
            if (param.data.date == oldDate.date) return Promise.resolve(true);
        }
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "trades/validate-duplicate-date",
                    { date: param.data.date },
                    { nonLoading: true, crypto: true }
                )
                .then((response) => {
                    // console.log(response);
                    resolve(response.data);
                });
        });
    },
    getData({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.get("trades", { crypto: true }).then((response) => {
                commit("setData", response.data);
                resolve();
            });
        });
    },
    getChart({ commit, dispatch, getters, state, rootGetters }, period) {
        // if (moment().diff(state.updatedAt, "seconds") < 3) return false;
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "trades/chart",
                    { period: period, page: 1 },
                    { noLoading: true, crypto: true }
                )
                .then((response) => {
                    response.data.data = createAccumulatedProfit(
                        response.data.data
                    );
                    commit("setChart", response.data);
                    resolve();
                });
        });
    },
    lazyLoad({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "trades/chart",
                    {
                        period: state.charts.period,
                        page: state.charts.page + 1,
                    },
                    { noLoading: true, crypto: true }
                )
                .then((response) => {
                    if (response.data.page > state.charts.page) {
                        let chartData = [
                            ...response.data.data,
                            ...JSON.parse(JSON.stringify(state.charts.data)),
                        ];
                        response.data.data = createAccumulatedProfit(chartData);
                        commit("setChart", response.data);
                    }
                    resolve();
                });
        });
    },
    save({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("trades", { changes: param.changes }, { crypto: true })
                .then((response) => {
                    resolve();
                    dispatch("getData");
                    dispatch("getChart", state.charts.period);
                });
        });
    },
    getSummary({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.get("trades/summary", { crypto: true }).then((response) => {
                commit("setSummary", response.data);
                resolve();
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
        state.updatedAt = moment();
    },
    setSummary(state, data) {
        state.summary = data;
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
