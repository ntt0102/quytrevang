function initialState() {
    return {
        profile: {},
    };
}

const getters = {};

const actions = {
    validateDuplicateEmail({ commit, dispatch, getters, state }, param) {
        if (param.value == state.profile.email) return Promise.resolve(true);
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "user/profile/validate-duplicate",
                    { field: "email", email: param.value },
                    { noLoading: true }
                )
                .then((response) => {
                    // console.log(response);
                    resolve(response.data);
                });
        });
    },
    validateDuplicateIdNumber({ commit, dispatch, getters, state }, param) {
        if (param.value == state.profile.identity.number)
            return Promise.resolve(true);
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "user/profile/validate-duplicate",
                    { field: "id_number", id_number: param.value },
                    { noLoading: true }
                )
                .then((response) => {
                    // console.log(response);
                    resolve(response.data);
                });
        });
    },
    validateDuplicatePhone({ commit, dispatch, getters, state }, param) {
        if (param.value == state.profile.phone) return Promise.resolve(true);
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "user/profile/validate-duplicate",
                    { field: "phone", phone: param.value },
                    { noLoading: true }
                )
                .then((response) => {
                    // console.log(response);
                    resolve(response.data);
                });
        });
    },
    changeAvatar({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("user/profile/avatar", { avatar: param })
                .then((response) => {
                    // console.log(response);
                    dispatch("auth/setAvatar", response.data.avatar, {
                        root: true,
                    });
                    commit("setAvatar", response.data.avatar);
                    resolve(response.data.isOk);
                });
        });
    },
    changePassword({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("user/profile/password", param).then((response) => {
                resolve(response.data.isOk);
            });
        });
    },
    changePin({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("user/profile/change-pin", param).then((response) => {
                resolve(response.data.isOk);
            });
        });
    },
    save({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("user/profile/save", param).then((response) => {
                resolve(response.data.isOk);
                dispatch("auth/check", true, { root: true });
                commit("setState", param);
            });
        });
    },
    delete({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.post("user/profile/delete").then((response) => {
                resolve(response.data.isOk);
            });
        });
    },
    getProfile({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.post("user/profile").then((response) => {
                commit("setState", response.data);
                resolve(response.data);
            });
        });
    },
    setState: ({ commit }, profile) => {
        commit("setState", profile);
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
