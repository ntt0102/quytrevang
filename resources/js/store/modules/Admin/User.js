function initialState() {
    return {
        users: [],
        deletedUsers: [],
        allRolesName: [],
        allPermissionsName: [],
        updatedAt: null,
    };
}

const getters = {};

const actions = {
    validateDuplicateEmail({ state, rootGetters }, param) {
        const oldUser = state.users.find((x) => x.id === param.data.id);
        if (!!oldUser && param.value == oldUser.email)
            return Promise.resolve(true);
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "users/validate-duplicate",
                    { field: "email", email: param.value },
                    { noLoading: true }
                )
                .then((response) => {
                    // console.log(response);
                    resolve(response.data);
                });
        });
    },
    validateDuplicateIdNumber({ state, rootGetters }, param) {
        // console.log("validateDuplicateIdNumber", param);
        const oldUser = state.users.find((x) => x.id === param.data.id);
        if (!!oldUser && param.value == oldUser.identity.number)
            return Promise.resolve(true);
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "users/validate-duplicate",
                    { field: "id_number", id_number: param.value },
                    { noLoading: true }
                )
                .then((response) => {
                    // console.log(response);
                    resolve(response.data);
                });
        });
    },
    validateDuplicatePhone({ state, rootGetters }, param) {
        const oldUser = state.users.find((x) => x.id === param.data.id);
        if (!!oldUser && param.value == oldUser.phone)
            return Promise.resolve(true);
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "users/validate-duplicate",
                    { field: "phone", phone: param.value },
                    { noLoading: true }
                )
                .then((response) => {
                    // console.log(response);
                    resolve(response.data);
                });
        });
    },
    getUsers({ commit, dispatch, getters, state, rootGetters }) {
        if (moment().diff(state.updatedAt, "seconds") < 3) return false;
        return new Promise((resolve, reject) => {
            axios.post("users").then((response) => {
                commit("setState", response.data);
                resolve();
            });
        });
    },
    save({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("users" + (param.isDeleted ? "/deleted" : "save"), {
                    changes: param.changes,
                })
                .then((response) => {
                    resolve();
                    dispatch("fetch");
                    dispatch("User.layout/initLayout", ["users"], {
                        root: true,
                    });
                });
        });
    },
    uploadDocuments({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("users/documents", param, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((response) => {
                    resolve(response.data.isOk);
                    dispatch("fetch");
                    dispatch("User.layout/initLayout", ["users"], {
                        root: true,
                    });
                });
        });
    },
    getContractInfo({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios
                .post("users/contract-info", null, { noLoading: true })
                .then((response) => {
                    console.log(response.data);
                    resolve(response.data);
                });
        });
    },
    resetState({ commit }) {
        commit("resetState");
    },
};

const mutations = {
    setState(state, data) {
        state.users = data.users;
        state.deletedUsers = data.deletedUsers;
        state.allRolesName = data.allRolesName;
        state.allPermissionsName = data.allPermissionsName;
        state.updatedAt = moment();
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
