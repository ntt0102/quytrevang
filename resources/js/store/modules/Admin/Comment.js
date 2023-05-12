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
            axios.get("comments").then((response) => {
                commit("setState", response.data);
                resolve();
            });
        });
    },
    markAsRead({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("comments", { id: param }, { noLoading: true })
                .then((response) => {
                    resolve();
                    dispatch("User.layout/initLayout", ["comments"], {
                        root: true,
                    });
                });
        });
    },
    delete({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("comments/delete", { ids: param }).then((response) => {
                commit("setState", response.data);
                resolve();
                dispatch("User.layout/initLayout", ["comments"], {
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
