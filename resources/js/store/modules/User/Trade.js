function initialState() {
    return { charts: {} };
}

const getters = {
    charts: state => state.charts
};

const actions = {
    getWeekChart({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.get("trade").then(response => {
                // console.log(response.data);
                commit("setState", response.data);
                resolve();
            });
        });
    }
};

const mutations = {
    setState(state, data) {
        state.charts = data;
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
};
