import { differenceInSeconds } from "date-fns";

function initialState() {
    return {
        contracts: [],
        interestRate: 0,
        principalMin: 0,
        holdWeeksMin: 0,
        transferInfo: null,
        updatedAt: null,
    };
}

const getters = {};

const actions = {
    getContracts(
        { commit, dispatch, getters, state, rootGetters },
        isOld = true
    ) {
        if (differenceInSeconds(new Date(), new Date(state.updatedAt)) < 3)
            return false;
        return new Promise((resolve, reject) => {
            axios.post("user/contract", { isOld: isOld }).then((response) => {
                // console.log(response);
                commit("setState", response.data);
                resolve();
            });
        });
    },
    save({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("user/contract/save", param).then((response) => {
                dispatch("fetch");
                dispatch("auth/check", true, { root: true });
                resolve(response.data);
            });
        });
    },
    payingContract({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("user/contract/paying", param, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((response) => {
                    if (response.data.isOk) dispatch("fetch");
                    resolve(response.data.isOk);
                });
        });
    },
    withdrawingContract({ commit, dispatch, getters, state }, param) {
        return new Promise((resolve, reject) => {
            axios.post("user/contract/withdrawing", param).then((response) => {
                if (response.data.isOk) dispatch("fetch");
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
        state.contracts = data.contracts;
        state.interestRate = data.interestRate;
        state.principalMin = data.principalMin;
        state.holdWeeksMin = data.holdWeeksMin;
        state.transferInfo = data.transferInfo;
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
