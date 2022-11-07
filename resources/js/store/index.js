import Vue from "vue";
import Vuex from "vuex";

import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

// Auth
import Auth from "./modules/Auth";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: { Auth },
    strict: debug
});
