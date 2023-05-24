function initialState() {
    return {};
}

const getters = {};

const actions = {
    backupDatabase({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("settings/database/backup", param).then((response) => {
                if (response.data.isOk == false) resolve(false);
                else {
                    if (param.download) {
                        var fileURL = window.URL.createObjectURL(
                            new Blob([response.data])
                        );
                        var fileLink = document.createElement("a");
                        fileLink.href = fileURL;
                        const filename = response.headers["content-disposition"]
                            .split("=")
                            .pop();
                        fileLink.setAttribute("download", filename);
                        document.body.appendChild(fileLink);
                        fileLink.click();
                    }
                    resolve(true);
                }
            });
        });
    },
    restoreDatabase({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("settings/database/restore", param, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((response) => {
                    resolve(response.data.isOk);
                    if (response.data.isOk)
                        dispatch("auth/check", true, { root: true });
                });
        });
    },
    runCommand({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("settings/command/run", { commands: param })
                .then((response) => {
                    resolve(response.data);
                    if (response.data.isOk)
                        dispatch("auth/check", true, { root: true });
                });
        });
    },
    sendNotification({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("settings/notification/send", param).then((response) => {
                resolve();
            });
        });
    },
    getLog({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("settings/log").then((response) => {
                resolve(response.data);
            });
        });
    },
    resetState({ commit }) {
        commit("resetState");
    },
};

const mutations = {
    setState(state, data) {
        state.parameters = data.parameters;
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
