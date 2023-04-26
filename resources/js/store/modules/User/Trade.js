function initialState() {
    return { charts: {}, copyRate: 0 };
}

const getters = {
    charts: (state) => state.charts,
    copyRate: (state) => state.copyRate,
};

const actions = {
    getMonthChart({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.get("trade", { crypto: true }).then((response) => {
                // console.log(response.data);
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
