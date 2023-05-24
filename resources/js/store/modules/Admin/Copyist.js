function initialState() {
    return {
        copyists: [],
        users: [],
        plans: [],
    };
}

const getters = {};

const actions = {
    getCopyists({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.get("copyists").then((response) => {
                // console.log(response.data);
                commit("setState", response.data);
                resolve();
            });
        });
    },
    validateDuplicateUser({ state, rootGetters }, param) {
        const oldSo = state.sos.find((x) => x.id === param.data.id);
        if (!!oldSo && param.value == oldSo.user_code)
            return Promise.resolve(true);
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "copyists/validate-user",
                    { userCode: param.value },
                    { noLoading: true }
                )
                .then((response) => {
                    // console.log(response);
                    resolve(response.data);
                });
        });
    },
    save({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("copyist/save", param).then((response) => {
                // console.log(response.data);
                resolve();
                if (response.data.isOk) dispatch("getCopyists");
            });
        });
    },
    getPlans({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.get("so/plans").then((response) => {
                // console.log(response.data);
                commit("setPlans", response.data);
                resolve();
            });
        });
    },
    savePlans({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("so/plans", param).then((response) => {
                // console.log(response.data);
                resolve();
                if (response.data.isOk) dispatch("getPlans");
            });
        });
    },
    resetState({ commit }) {
        commit("resetState");
    },
};

const mutations = {
    setState(state, data) {
        state.copyists = data.copyists;
        state.users = data.users;
    },
    setPlans(state, data) {
        state.plans = data.plans;
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
