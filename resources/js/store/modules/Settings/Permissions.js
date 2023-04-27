function initialState() {
    return {
        permissions: []
    };
}

const getters = {
    permissions: state => state.permissions
};

const actions = {
    validateDuplicateName({ state, rootGetters }, param) {
        const oldPermission = state.permissions.find(
            x => x.id === param.data.id
        );
        if (!!oldPermission && param.value == oldPermission.name)
            return Promise.resolve(true);
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "settings/permissions/validate-duplicate-name",
                    { name: param.value },
                    { noLoading: true }
                )
                .then(response => {
                    // console.log(response);
                    resolve(response.data);
                });
        });
    },
    fetch({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.get("settings/permissions").then(response => {
                // console.log(response.data);
                commit("setState", response.data);
                resolve();
            });
        });
    },
    save({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("settings/permissions", { changes: param.changes })
                .then(response => {
                    // console.log(response.data);
                    resolve();
                    dispatch("fetch");
                    // dispatch("Admin.roles/fetch", null, { root: true });
                });
        });
    },
    resetState({ commit }) {
        commit("resetState");
    }
};

const mutations = {
    setState(state, data) {
        state.permissions = data.permissions;
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
