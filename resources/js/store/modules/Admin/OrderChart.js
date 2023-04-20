import moment from "moment/moment";

function initialState() {
    return {
        config: {},
        chartData: []
    };
}

const getters = {
    config: state => state.config,
    chartData: state => state.chartData
};

const actions = {
    getChartData({ commit, dispatch, getters, state, rootGetters }, chartDate) {
        console.log("getChartData: ", chartDate);
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "order-chart",
                    { date: chartDate },
                    { noLoading: true, crypto: true }
                )
                .then(response => {
                    commit("setChartData", response.data);
                    resolve();
                });
        });
    },
    getConfig({ commit, dispatch, getters, state, rootGetters }, chartDate) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "order-chart/get-config",
                    {},
                    { noLoading: true, crypto: true }
                )
                .then(response => {
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
                .then(response => {
                    // console.log(response.data);
                    commit("setChartData", response.data);
                    resolve();
                });
        });
    },

    validateDuplicateUser({ state, rootGetters }, param) {
        const oldSo = state.sos.find(x => x.id === param.data.id);
        if (!!oldSo && param.value == oldSo.user_code)
            return Promise.resolve(true);
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "so/manage/validate-user",
                    { userCode: param.value },
                    { noLoading: true }
                )
                .then(response => {
                    // console.log(response);
                    resolve(response.data);
                });
        });
    },
    save({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("so/manage", param).then(response => {
                // console.log(response.data);
                resolve();
                if (response.data.isOk) dispatch("fetch");
            });
        });
    },
    getPlans({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.get("so/plans").then(response => {
                // console.log(response.data);
                commit("setPlans", response.data);
                resolve();
            });
        });
    },
    savePlans({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("so/plans", param).then(response => {
                // console.log(response.data);
                resolve();
                if (response.data.isOk) dispatch("getPlans");
            });
        });
    },
    resetState({ commit }) {
        commit("resetState");
    }
};

const mutations = {
    setState(state, data) {},
    setChartData(state, data) {
        state.chartData = data;
    },
    setConfig(state, data) {
        state.config = data;
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
