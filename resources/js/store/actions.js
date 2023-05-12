export default {
    setSyncing({ commit }, status) {
        commit("setSyncing", status);
    },

    sendComment({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("send-comment", param, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((response) => {
                    resolve(response.data.isOk);
                });
        });
    },

    getContact({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.get("contact", { noLoading: true }).then((response) => {
                commit("getContact", response.data);
            });
        });
    },

    getFaqs({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.get("get-faqs", { noLoading: true }).then((response) => {
                commit("getFaqs", response.data);
            });
        });
    },
    getNotify(
        { commit, dispatch, getters, state },
        types = ["notification", "adminUser", "adminContract", "adminComment"]
    ) {
        return new Promise((resolve, reject) => {
            axios
                .post("get-notify", { types }, { noLoading: true })
                .then((response) => {
                    commit("setNotify", { ...state.notify, ...response.data });
                    resolve();
                });
        });
    },
    setPushSubscribed({ commit }, status) {
        commit("setPushSubscribed", status);
    },
    subscribePush({ commit, dispatch, getters, state }, subscription) {
        return new Promise((resolve, reject) => {
            const key = subscription.getKey("p256dh");
            const token = subscription.getKey("auth");

            const data = {
                endpoint: subscription.endpoint,
                key: key
                    ? btoa(String.fromCharCode.apply(null, new Uint8Array(key)))
                    : null,
                token: token
                    ? btoa(
                          String.fromCharCode.apply(null, new Uint8Array(token))
                      )
                    : null,
            };

            axios
                .post("subscribe-push", data, { noLoading: true })
                .then((response) => {
                    commit("setPushSubscribed", true);
                    resolve();
                });
        });
    },
    unsubscribePush({ commit, dispatch, getters, state }, subscription) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "unsubscribe-push",
                    { endpoint: subscription.endpoint },
                    { noLoading: true }
                )
                .then((response) => {
                    commit("setPushSubscribed", false);
                    resolve();
                });
        });
    },
    getNotifications({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.get("notifications", { noLoading: true }).then((response) => {
                commit("setNotifications", response.data);
                resolve();
            });
        });
    },
    markAsRead({ commit, dispatch, getters, state, rootGetters }, id) {
        axios.post(`notifications/${id}/read`, null, { noLoading: true });
    },
    markAllRead({ commit, dispatch, getters, state, rootGetters }) {
        if (state.layout.unreadNotificationsNumber > 0)
            axios.post(`notifications/mark-all-read`, null, {
                noLoading: true,
            });
    },
};
