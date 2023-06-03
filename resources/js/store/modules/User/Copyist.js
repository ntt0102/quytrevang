function initialState() {
    return {
        copyist: {},
    };
}

const getters = {};

const actions = {
    validateVpsCode({ commit, dispatch, getters, state }, param) {
        if (param.value == state.copyist.vps_code) return Promise.resolve(true);
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "user/copyist/validate-vpscode",
                    { vps_code: param.value },
                    { noLoading: true }
                )
                .then((response) => {
                    resolve(response.data);
                });
        });
    },
    getCopyist({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.post("user/copyist").then((response) => {
                commit("setState", response.data);
                resolve(response.data);
            });
        });
    },
    save({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("user/copyist/save", param).then((response) => {
                resolve(response.data.isOk);
            });
        });
    },
    resetState({ commit }) {
        commit("resetState");
    },
};

const mutations = {
    setState(state, data) {
        state.copyist = data.copyist;
    },
    resetState(state) {
        state = Object.assign(state, initialState());
    },
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    mutations,
    actions,
};
