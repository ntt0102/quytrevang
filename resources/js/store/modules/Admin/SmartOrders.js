import moment from "moment/moment";

function initialState() {
    return {
        sos: [],
        users: []
    };
}

const getters = {
    sos: state => state.sos,
    users: state => state.users
};

const actions = {
    fetch({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.get("so/manage").then(response => {
                console.log(response.data);
                commit("setState", response.data);
                resolve();
            });
        });
    },
    save({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("so/manage", param).then(response => {
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
        state.sos = data.sos;
        state.users = data.users;
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
