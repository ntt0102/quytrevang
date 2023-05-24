function initialState() {
    return { charts: {}, copyRate: 0 };
}

const getters = {};

const actions = {
    getMonthChart({ commit, dispatch, getters, state }) {
        return new Promise((resolve, reject) => {
            axios.post("trade", null).then((response) => {
                commit("setState", response.data);
                resolve();
            });
        });
    },
};

const mutations = {
    setState(state, data) {
        state.charts = data.charts;
        state.copyRate = data.copyRate;
    },
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations,
};
