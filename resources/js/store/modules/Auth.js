import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import { webauthnAuthenticate, webauthnRegister } from "../../plugins/webauthn";

function initialState() {
    return {
        user: {
            id: null,
            code: null,
            name: null,
            sex: "",
            email: null,
            level: 0,
            avartar: null,
            permissions: [],
            webauthn: false,
        },
        token: null,
    };
}

function setTokenCookie(token) {
    cookies.set("AccessToken", token.access_token, new Date(token.expires_at));
}

function removeTokenCookie() {
    console.log("clearToken");
    cookies.remove("AccessToken");
}

function getTokenCookie() {
    return cookies.get("AccessToken");
}

/**
 *
 * Decodes a BASE64 URL string into a normal string.
 *
 * @param input {string}
 * @returns {string|Iterable}
 */
function base64UrlDecode(input) {
    input = input.replace(/-/g, "+").replace(/_/g, "/");
    const pad = input.length % 4;

    if (pad) {
        if (pad === 1) {
            throw new Error(
                "InvalidLengthError: Input base64url string is the wrong length to determine padding"
            );
        }

        input += new Array(5 - pad).join("=");
    }

    return window.atob(input);
}
/**
 * Transform an string into Uint8Array instance.
 *
 * @param input {string}
 * @param atob {boolean}
 * @returns {Uint8Array}
 */
function uint8Array(input, atob = false) {
    return Uint8Array.from(
        atob ? window.atob(input) : base64UrlDecode(input),
        (c) => c.charCodeAt(0)
    );
}
/**
 * Encodes an array of bytes to a BASE64 URL string
 *
 * @param arrayBuffer {ArrayBuffer|Uint8Array}
 * @returns {string}
 */
function arrayToBase64String(arrayBuffer) {
    return btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
}
/**
 * Parses the Public Key Options received from the Server for the browser.
 *
 * @param publicKey {Object}
 * @returns {Object}
 */
function parseIncomingServerOptions(publicKey) {
    publicKey.challenge = uint8Array(publicKey.challenge);

    if (publicKey.user !== undefined) {
        publicKey.user = {
            ...publicKey.user,
            id: uint8Array(publicKey.user.id, true),
        };
        delete publicKey.user.icon;
    }

    ["excludeCredentials", "allowCredentials"]
        .filter((key) => publicKey[key] !== undefined)
        .forEach((key) => {
            publicKey[key] = publicKey[key].map((data) => {
                return { ...data, id: uint8Array(data.id) };
            });
        });
    return publicKey;
}

/**
 * Parses the outgoing credentials from the browser to the server.
 *
 * @param credentials {Credential|PublicKeyCredential}
 * @return {{response: {string}, rawId: string, id: string, type: string}}
 */
function parseOutgoingCredentials(credentials) {
    let parseCredentials = {
        id: credentials.id,
        type: credentials.type,
        rawId: arrayToBase64String(credentials.rawId),
        response: {},
    };
    [
        "clientDataJSON",
        "attestationObject",
        "authenticatorData",
        "signature",
        "userHandle",
    ]
        .filter((key) => credentials.response[key] !== undefined)
        .forEach((key) => {
            parseCredentials.response[key] = arrayToBase64String(
                credentials.response[key]
            );
        });
    return parseCredentials;
}

const getters = {
    user: (state) => state.user,
    id: (state) => state.user.id,
    code: (state) => state.user.code,
    name: (state) => state.user.name,
    sex: (state) => state.user.sex,
    email: (state) => state.user.email,
    phone: (state) => state.user.phone,
    avatar: (state) => state.user.avatar,
    permissions: (state) => state.user.permissions,
    webauthn: (state) => state.user.webauthn,
    isLoggedin: (state) => !!state.user.code,
    level: (state) => state.user.level,
    token: (state) => state.token,
};

const actions = {
    validateDuplicateEmail({ commit, dispatch, getters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "auth/validate-duplicate-email",
                    { email: param.value },
                    { noLoading: true }
                )
                .then((response) => {
                    // console.log(response);
                    resolve(response.data);
                });
        });
    },
    validateExistEmail({ commit, dispatch, getters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    "auth/password/validate-exist-email",
                    { email: param.value },
                    { noLoading: true }
                )
                .then((response) => {
                    // console.log(response);
                    resolve(response.data);
                });
        });
    },
    resendEmail({ commit, dispatch, getters }) {
        return new Promise((resolve, reject) => {
            axios.post("auth/email/resend").then((response) => {
                resolve();
            });
        });
    },
    verifyEmail({ commit, dispatch, getters }, url) {
        return new Promise((resolve, reject) => {
            axios.post(url).then((response) => {
                // console.log(response);
                if (response.data.isOk) {
                    commit("setUser", response.data.user);
                }
                resolve(response.data.isOk);
            });
        });
    },
    resetPassword({ commit, dispatch, getters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("auth/password/reset", param).then((response) => {
                // console.log(response);
                resolve();
            });
        });
    },
    changePassword({ commit, dispatch, getters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("auth/password/change", param).then((response) => {
                // console.log(response);
                if (response.data.isOk) {
                    setTokenCookie(response.data.token);

                    commit("setState", response.data);
                }
                resolve(response.data.isOk);
            });
        });
    },
    createAccount({ commit, dispatch, getters }, param) {
        delete param.password_confirmation;
        return new Promise((resolve, reject) => {
            axios.post("auth/create-account", param).then((response) => {
                // console.log(response);
                if (response.data.isOk) {
                    setTokenCookie(response.data.token);
                    commit("setState", response.data);
                }
                resolve(response.data.isOk);
            });
        });
    },
    registerWebAuthn({ commit, dispatch, getters, state, rootGetters }) {
        return new Promise(async (resolve, reject) => {
            const optionsResponse = await axios.post(
                "auth/register-webauthn",
                { routeAction: "attest" },
                { noLoading: true }
            );
            webauthnRegister(
                optionsResponse.data.challenge,
                (success, info) => {
                    if (success) {
                        axios
                            .post("auth/register-webauthn", {
                                credentials: info,
                                routeAction: "verify",
                            })
                            .then((response) => {
                                dispatch("check", true);
                                resolve();
                            });
                    }
                }
            );
        });
    },
    loginWebAuthn({ commit, dispatch, getters, state, rootGetters }, username) {
        return new Promise(async (resolve, reject) => {
            const optionsResponse = await axios.post(
                "auth/login-webauthn",
                { routeAction: "assert", username: username },
                { noLoading: true }
            );
            webauthnAuthenticate(
                optionsResponse.data.challenge,
                (success, info) => {
                    if (success) {
                        axios
                            .post("auth/login-webauthn", {
                                credentials: info,
                                userId: optionsResponse.data.userId,
                                routeAction: "verify",
                            })
                            .then((response) => {
                                if (response.data.isOk) {
                                    setTokenCookie(response.data.token);
                                    commit("setState", response.data);
                                    resolve({
                                        isOk: response.data.isOk,
                                        isMaintenance:
                                            response.data.isMaintenance,
                                        user: {
                                            username: response.data.user.email,
                                            avatar: response.data.user.avatar,
                                            name: response.data.user.name,
                                            webauthn:
                                                response.data.user.webauthn,
                                        },
                                    });
                                } else resolve({ isOk: false });
                            });
                    }
                }
            );
        });
    },
    confirmWebAuthn({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise(async (resolve, reject) => {
            const optionsResponse = await axios.post(
                "auth/confirm-webauthn",
                { routeAction: "assert" },
                { noLoading: true }
            );
            webauthnAuthenticate(
                optionsResponse.data.challenge,
                (success, info) => {
                    if (success) {
                        axios
                            .post(
                                "auth/confirm-webauthn",
                                {
                                    credentials: info,
                                    routeAction: "verify",
                                },
                                { noLoading: true, notify: true }
                            )
                            .then((response) => {
                                resolve(response.data.isOk);
                            });
                    }
                }
            );
        });
    },
    login({ commit, dispatch, getters }, param) {
        return new Promise((resolve, reject) => {
            axios.post("auth/login", param).then((response) => {
                if (response.data.isOk) {
                    setTokenCookie(response.data.token);
                    commit("setState", response.data);
                    resolve({
                        isOk: response.data.isOk,
                        isMaintenance: response.data.isMaintenance,
                        user: {
                            username: response.data.user.email,
                            avatar: response.data.user.avatar,
                            name: response.data.user.name,
                            webauthn: response.data.user.webauthn,
                        },
                    });
                } else resolve({ isOk: false });
            });
        });
    },
    logout({ commit, dispatch, getters }) {
        return new Promise((resolve) => {
            axios.post("auth/logout").then((response) => {
                // console.log(response);
                removeTokenCookie();
                commit("resetState");
                resolve(true);
            });
        });
    },
    check({ commit, dispatch, state }, force = false) {
        if (!force && state.user.code) return Promise.resolve();
        var access_token = getTokenCookie();
        if (!access_token) return Promise.resolve();
        commit("setToken", access_token);
        return new Promise((resolve) => {
            axios
                .post("auth/user", null, { noLoading: true })
                .then((response) => {
                    console.log(response);
                    commit("setUser", response.data);
                    resolve();
                })
                .catch((error) => {
                    if (error.status == 401) {
                        removeTokenCookie();
                        commit("resetState");
                    }
                    resolve();
                });
        });
    },
    checkPin({ commit, dispatch, getters, state, rootGetters }, param) {
        return new Promise((resolve, reject) => {
            axios
                .post("auth/check-pin", { pin: param }, { noLoading: true })
                .then((response) => {
                    resolve(response.data.isOk);
                });
        });
    },
    setAvatar: ({ commit }, avatar) => {
        commit("setAvatar", avatar);
    },
    setState: ({ commit, dispatch }, param) => {
        setTokenCookie(param.token);
        commit("setState", param);
    },
    clearData: ({ commit }) => {
        removeTokenCookie();
        commit("resetState");
    },
};

const mutations = {
    setState(state, data) {
        state.user = data.user;
        state.token = data.token.access_token;
    },
    setUser(state, user) {
        state.user = user;
    },
    setToken(state, token) {
        state.token = token;
    },
    setAvatar(state, avatar) {
        state.user.avatar = avatar;
    },
    resetState(state) {
        state = Object.assign(state, initialState());
    },
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    mutations,
    actions,
};
