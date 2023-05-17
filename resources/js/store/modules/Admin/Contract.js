function initialState() {
    return {
        contracts: [],
        users: [],
        interestRate: 0,
        principalMin: 0,
        isOld: false,
        updatedAt: null,
    };
}

const getters = {};

const actions = {
    getContracts({ commit, dispatch, getters, state, rootGetters }, isOld) {
        if (moment().diff(state.updatedAt, "seconds") < 3) return false;
        if (isOld == undefined) isOld = state.isOld;
        return new Promise((resolve, reject) => {
            axios.get("contracts?isOld=" + isOld).then((response) => {
                response.data.isOld = isOld;
                commit("setState", response.data);
                resolve();
            });
        });
    },
    save({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("contracts", param).then((response) => {
                resolve();
                if (response.data.isOk) {
                    dispatch("fetch", state.isOld);
                    dispatch("User.layout/initLayout", ["contracts"], {
                        root: true,
                    });
                    // dispatch("auth/check", true, { root: true });
                }
            });
        });
    },
    paidContract({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("contracts/paid", param, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((response) => {
                    resolve(response.data.isOk);
                    if (response.data.isOk) {
                        dispatch("fetch", state.isOld);
                        dispatch("User.layout/initLayout", ["contracts"], {
                            root: true,
                        });
                    }
                });
        });
    },
    withdrawnContract(
        { commit, dispatch, getters, state, rootGetters },
        param
    ) {
        return new Promise((resolve, reject) => {
            axios
                .post("contracts/withdrawn", param, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((response) => {
                    resolve(response.data.isOk);
                    if (response.data.isOk) {
                        dispatch("fetch", state.isOld);
                        dispatch("User.layout/initLayout", ["contracts"], {
                            root: true,
                        });
                    }
                });
        });
    },
    getSummary({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.get("contracts/summary").then((response) => {
                resolve(response.data);
            });
        });
    },
    getReceiptInfo(
        { commit, dispatch, getters, state, rootGetters },
        userCode
    ) {
        return new Promise((resolve, reject) => {
            axios
                .get(`contracts/receipt-info?userCode=${userCode}`, {
                    noLoading: true,
                })
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
        state.contracts = data.contracts;
        state.users = data.users;
        state.interestRate = data.interestRate;
        state.principalMin = data.principalMin;
        state.isOld = data.isOld;
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
