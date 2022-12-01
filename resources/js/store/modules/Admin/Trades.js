function initialState() {
    return {
        charts: { page: 0 },
        trades: [],
        summary: {},
        updatedAt: null
    };
}

const getters = {
    charts: state => state.charts,
    trades: state => state.trades,
    summary: state => state.summary,
    period: state => state.charts.period,
    page: state => state.charts.page
};

const actions = {
    fetch({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.get("trades").then(response => {
                // console.log(response.data);
                commit("setState", response.data);
                resolve();
            });
        });
    },
    getChart({ commit, dispatch, getters, state, rootGetters }, period) {
        if (moment().diff(state.updatedAt, "seconds") < 3) return false;
        return new Promise((resolve, reject) => {
            axios.get(`trades/chart?period=${period}&page=1`).then(response => {
                // console.log(response.data);
                response.data.data = response.data.data.reduce(
                    (carry, item) => {
                        item.accumulatedProfit =
                            item.profit +
                            (!!carry.length
                                ? carry.at(-1).accumulatedProfit
                                : 0);
                        carry.push(item);
                        return carry;
                    },
                    []
                );
                commit("setChart", response.data);
                resolve();
            });
        });
    },
    lazyLoad({ commit, dispatch, getters, state, rootGetters }) {
        const page = state.charts.page + 1;
        return new Promise((resolve, reject) => {
            axios
                .get(`trades/chart?period=${state.charts.period}&page=${page}`)
                .then(response => {
                    // console.log(response.data);
                    if (response.data.page > state.charts.page) {
                        let chartData = [
                            ...response.data.data,
                            ...JSON.parse(JSON.stringify(state.charts.data))
                        ];
                        response.data.data = chartData.reduce((carry, item) => {
                            item.accumulatedProfit =
                                item.profit +
                                (!!carry.length
                                    ? carry.at(-1).accumulatedProfit
                                    : 0);
                            carry.push(item);
                            return carry;
                        }, []);
                        commit("setChart", response.data);
                    }
                    resolve();
                });
        });
    },
    save({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("trades", { changes: param.changes }).then(response => {
                // console.log(response.data);
                resolve();
                dispatch("fetch");
                dispatch("getChart", state.charts.period);
            });
        });
    },
    getSummary({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.get("trades/summary").then(response => {
                // console.log(response.data);
                commit("setSummary", response.data);
                resolve();
            });
        });
    },
    getSymbol({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.post("trades/symbol").then(response => {
                console.log(response.data);
                resolve(response.data);
            });
        });
    },
    getShare({ commit, dispatch, getters, state, rootGetters }, symbol) {
        return new Promise((resolve, reject) => {
            axios.post("trades/share", { symbol }).then(response => {
                console.log(response.data);
                resolve(response.data);
            });
        });
    },
    getFlow({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.get(`trades/flow`).then(response => {
                // console.log(response.data);
                resolve(response.data);
            });
        });
    },
    saveFlow({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("trades/flow/save", { data: param }).then(response => {
                // console.log(response.data);
                resolve();
            });
        });
    },
    resetState({ commit }) {
        commit("resetState");
    }
};

const mutations = {
    setState(state, data) {
        state.trades = data;
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
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
};
