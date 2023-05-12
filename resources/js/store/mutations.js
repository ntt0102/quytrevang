export default {
    setRouteHistoryState(state, data) {
        state.routeHistoryState = data;
    },
    setSyncing(state, status) {
        state.isSyncing = status;
    },
    getContact(state, data) {
        state.contact = data;
    },
    getFaqs(state, data) {
        state.faqs = data;
    },
    setNotify(state, data) {
        state.notify = data;
    },
    setPushSubscribed(state, status) {
        state.pushSubscribed = status;
    },
    setNotifications(state, notifications) {
        state.notifications = notifications;
    },
};
