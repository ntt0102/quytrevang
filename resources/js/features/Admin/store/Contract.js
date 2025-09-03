import { differenceInSeconds } from "date-fns";

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
        if (differenceInSeconds(new Date(), new Date(state.updatedAt)) < 3)
            return false;
        if (isOld == undefined) isOld = state.isOld;
        return new Promise((resolve, reject) => {
            axios.post("admin/contract", { isOld: isOld }).then((response) => {
                response.data.isOld = isOld;
                commit("setState", response.data);
                resolve();
            });
        });
    },
    save({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("admin/contract/save", param).then((response) => {
                resolve();
                if (response.data.isOk) {
                    dispatch("fetch", state.isOld);
                    dispatch("getNotify", ["adminContract"], {
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
                .post("admin/contract/paid", param, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((response) => {
                    resolve(response.data.isOk);
                    if (response.data.isOk) {
                        dispatch("fetch", state.isOld);
                        dispatch("getNotify", ["adminContract"], {
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
                .post("admin/contract/withdrawn", param, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((response) => {
                    resolve(response.data.isOk);
                    if (response.data.isOk) {
                        dispatch("fetch", state.isOld);
                        dispatch("getNotify", ["adminContract"], {
                            root: true,
                        });
                    }
                });
        });
    },
    getSummary({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.post("admin/contract/summary").then((response) => {
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
                .post(
                    "admin/contracts/receipt-info",
                    { userCode: userCode },
                    {
                        noLoading: true,
                    }
                )
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
        state.updatedAt = new Date();
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
