function initialState() {
    return {
        copyist: {},
    };
}

const getters = {};

const actions = {
    validateVpsCode({ commit, dispatch, getters, state }, param) {
        if (param.value == getters.profile.email) return Promise.resolve(true);
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "user/profile/validate-vpscode",
                    { vps_code: param.value },
                    { noLoading: true }
                )
                .then((response) => {
                    // console.log(response);
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
                dispatch("auth/check", true, { root: true });
                commit("setState", param);
            });
        });
    },
    resetState({ commit }) {
        commit("resetState");
    },
};

const mutations = {
    setState(state, data) {
        state.profile = data;
    },
    setAvatar(state, avatar) {
        state.profile.avatar = avatar;
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
