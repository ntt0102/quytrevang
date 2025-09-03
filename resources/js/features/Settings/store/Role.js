function initialState() {
    return {
        roles: [],
        permissions: [],
    };
}

const getters = {};

const actions = {
    validateDuplicateName({ state, rootGetters }, param) {
        const oldRole = state.roles.find((x) => x.id === param.data.id);
        if (!!oldRole && param.value == oldRole.name)
            return Promise.resolve(true);
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "settings/role/validate-duplicate-name",
                    { name: param.value },
                    { noLoading: true }
                )
                .then((response) => {
                    // console.log(response);
                    resolve(response.data);
                });
        });
    },
    getRoles({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.post("settings/role").then((response) => {
                commit("setState", response.data);
                resolve();
            });
        });
    },
    save({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("settings/role/save", { changes: param.changes })
                .then((response) => {
                    resolve();
                    dispatch("getRoles");
                });
        });
    },
    resetState({ commit }) {
        commit("resetState");
    },
};

const mutations = {
    setState(state, data) {
        state.roles = data.roles;
        state.permissions = data.permissions;
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
