import moment from "moment/moment";

function initialState() {
    return {
        finbooks: [],
        updatedAt: null
    };
}

const getters = {
    finbooks: state => state.finbooks
};

const actions = {
    fetch({ commit, dispatch, getters, state, rootGetters }) {
        if (moment().diff(state.updatedAt, "seconds") < 3) return false;
        return new Promise((resolve, reject) => {
            axios.get("finbooks").then(response => {
                // console.log(response.data);
                commit("setState", response.data);
                resolve();
            });
        });
    },
    save({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("finbooks", param).then(response => {
                // console.log(response.data);
                resolve();
                if (response.data.isOk) dispatch("fetch");
            });
        });
    },
    getFinbooksName({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios
                .post("finbooks/name", null, { noLoading: true })
                .then(response => {
                    // console.log(response.data);
                    resolve(response.data);
                });
        });
    },
    updateBalance({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("finbooks/update-balance", param).then(response => {
                // console.log(response.data);
                resolve(response.data.isOk);
                if (response.data.isOk) dispatch("fetch");
            });
        });
    },
    resetState({ commit }) {
        commit("resetState");
    }
};

const mutations = {
    setState(state, data) {
        state.finbooks = data;
        state.updatedAt = moment();
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
