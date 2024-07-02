function initialState() {
    return {
        comments: [],
        updatedAt: null,
    };
}

const getters = {};

const actions = {
    getComments({ commit, dispatch, getters, state, rootGetters }, param) {
        if (moment().diff(state.updatedAt, "seconds") < 3) return false;
        return new Promise((resolve, reject) => {
            axios.post("admin/comment").then((response) => {
                commit("setState", response.data);
                resolve();
            });
        });
    },
    markAsRead({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "admin/comment/mark-read",
                    { id: param },
                    { noLoading: true }
                )
                .then((response) => {
                    resolve();
                    dispatch("getNotify", ["adminComment"], {
                        root: true,
                    });
                });
        });
    },
    delete({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("admin/comment/delete", { ids: param })
                .then((response) => {
                    commit("setState", response.data);
                    resolve();
                    dispatch("getNotify", ["adminComment"], {
                        root: true,
                    });
                });
        });
    },
    resetState({ commit }) {
        commit("resetState");
    },
};

const mutations = {
    setState(state, data) {
        state.comments = data;
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
