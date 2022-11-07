export default {
    setSyncing(state, status) {
        state.isSyncing = status;
    },
    getContact(state, data) {
        state.contact = data;
    },
    getFaqs(state, data) {
        state.faqs = data;
    }
};
