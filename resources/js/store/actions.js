export default {
    setSyncing({ commit }, status) {
        commit("setSyncing", status);
    },

    sendComment({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("send-comment", param, {
                    headers: { "Content-Type": "multipart/form-data" }
                })
                .then(response => {
                    // console.log(response.data);
                    resolve(response.data.isOk);
                });
        });
    },

    getContact({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.get("contact", { noLoading: true }).then(response => {
                // console.log(response.data);
                commit("getContact", response.data);
            });
        });
    },

    getFaqs({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.get("get-faqs", { noLoading: true }).then(response => {
                // console.log(response.data);
                commit("getFaqs", response.data);
            });
        });
    }
};
