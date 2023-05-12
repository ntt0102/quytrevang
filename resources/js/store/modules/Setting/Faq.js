function initialState() {
    return {
        faqs: [],
    };
}

const getters = {
    faqs: (state) => state.faqs,
};

const actions = {
    fetch({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.get("settings/faqs").then((response) => {
                commit("setState", response.data);
                resolve();
            });
        });
    },
    save({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("settings/faqs", { changes: param.changes })
                .then((response) => {
                    resolve();
                    dispatch("fetch");
                });
        });
    },
    resetState({ commit }) {
        commit("resetState");
    },
};

const mutations = {
    setState(state, data) {
        state.faqs = data;
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
