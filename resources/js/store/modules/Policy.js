function initialState() {
    return {
        data: {},
        isLoaded: false
    };
}

const getters = {
    interestRate: state => state.data.interestRate,
    principalMin: state => state.data.principalMin,
    holdWeeksMin: state => state.data.holdWeeksMin,
    faqs: state => state.data.faqs
};

const actions = {
    fetch({ commit, dispatch, getters, state, rootGetters }, param) {
        if (state.isLoaded) return Promise.resolve(true);
        return new Promise((resolve, reject) => {
            axios.get("policy-params").then(response => {
                commit("setState", response.data);
                resolve(response.data);
            });
        });
    },
    resetState({ commit }) {
        commit("resetState");
    }
};

const mutations = {
    setState(state, data) {
        state.data = data;
        state.isLoaded = true;
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
