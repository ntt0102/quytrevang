function initialState() {
    return {
        permissions: [],
    };
}

const getters = {};

const actions = {
    validateDuplicateName({ state, rootGetters }, param) {
        const oldPermission = state.permissions.find(
            (x) => x.id === param.data.id
        );
        if (!!oldPermission && param.value == oldPermission.name)
            return Promise.resolve(true);
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "settings/permission/validate-duplicate-name",
                    { name: param.value },
                    { noLoading: true }
                )
                .then((response) => {
                    // console.log(response);
                    resolve(response.data);
                });
        });
    },
    getPermissions({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.post("settings/permission").then((response) => {
                commit("setState", response.data);
                resolve();
            });
        });
    },
    save({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("settings/permission/save", { changes: param.changes })
                .then((response) => {
                    resolve();
                    dispatch("getPermissions");
                });
        });
    },
    resetState({ commit }) {
        commit("resetState");
    },
};

const mutations = {
    setState(state, data) {
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
