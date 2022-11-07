function initialState() {
    return {
        layout: {
            unreadNotificationsNumber: 0,
            confirmingContractsNumber: 0,
            signingUsersNumber: 0,
            unreadCommentsNumber: 0
        },
        isPushEnabled: true,
        notifications: []
    };
}

const getters = {
    unreadNotificationsNumber: state => state.layout.unreadNotificationsNumber,
    notifications: state => state.notifications,
    sidenav: state => {
        const layout = state.layout;
        return {
            confirmingContractsNumber: layout.confirmingContractsNumber,
            signingUsersNumber: layout.signingUsersNumber,
            unreadCommentsNumber: layout.unreadCommentsNumber
        };
    },
    isPushEnabled: state => state.isPushEnabled
};

const actions = {
    initLayout(
        { commit, dispatch, getters, state },
        types = ["notification", "contracts", "users", "comments"]
    ) {
        return new Promise((resolve, reject) => {
            axios
                .post("layout", { types }, { noLoading: true })
                .then(response => {
                    // console.log(response.data);
                    commit("setLayout", { ...state.layout, ...response.data });
                    resolve();
                });
        });
    },
    updateSubscription({ commit, dispatch, getters, state }, subscription) {
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
                    : null
            };

            axios
                .post("subscriptions", data, { noLoading: true })
                .then(response => {
                    if (!getters.isPushEnabled) commit("setPushEnabled", true);
                    resolve();
                });
        });
    },
    deleteSubscription({ commit, dispatch, getters, state }, subscription) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "subscriptions/destroy",
                    { endpoint: subscription.endpoint },
                    { noLoading: true }
                )
                .then(response => {
                    if (getters.isPushEnabled) commit("setPushEnabled", false);
                    resolve();
                });
        });
    },
    fetchNotification({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise((resolve, reject) => {
            axios.get("notifications", { noLoading: true }).then(response => {
                // console.log(response.data);
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
                noLoading: true
            });
    },
    setPushEnabled({ commit }, status) {
        commit("setPushEnabled", status);
    },
    resetState({ commit }) {
        commit("resetState");
    }
};

const mutations = {
    setLayout(state, data) {
        state.layout = data;
    },
    setNotifications(state, notifications) {
        state.notifications = notifications;
    },
    resetState(state) {
        state = Object.assign(state, initialState());
    },
    setPushEnabled(state, status) {
        state.isPushEnabled = status;
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
};
