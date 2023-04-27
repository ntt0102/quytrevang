function initialState() {
    return {
        parameters: []
    };
}

const getters = {
    parameters: state => state.parameters
};

const actions = {
    fetch({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.get("settings/parameters").then(response => {
                // console.log(response.data);
                commit("setState", response.data);
                resolve();
            });
        });
    },
    save({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("settings/parameters", { changes: param.changes })
                .then(response => {
                    // console.log(response.data);
                    resolve();
                    dispatch("fetch");
                });
        });
    },
    resetState({ commit }) {
        commit("resetState");
    }
};

const mutations = {
    setState(state, data) {
        state.parameters = data;
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
