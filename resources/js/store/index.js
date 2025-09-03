import { createStore } from "vuex";

import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
// MODULES
import auth from "../features/Auth/store/Auth";
import policy from "../features/Policy/store/Policy";
// User
import userProfile from "../features/User/store/Profile";
import userContract from "../features/User/store/Contract";
import userCopyist from "../features/User/store/Copyist";
import userTrade from "../features/User/store/Trade";
// Admin
import adminUser from "../features/Admin/store/User";
import adminContract from "../features/Admin/store/Contract";
import adminCopyist from "../features/Admin/store/Copyist";
import adminComment from "../features/Admin/store/Comment";
// Trading
import tradingDerivative from "../features/Trading/store/Derivative";
import tradingDerstat from "../features/Trading/store/Derstat";
import tradingShare from "../features/Trading/store/Share";
import tradingShrstat from "../features/Trading/store/Shrstat";
import tradingFinbook from "../features/Trading/store/Finbook";
// Settings
import setting from "../features/Settings/store/Index";
import settingFaq from "../features/Settings/store/Faq";
import settingParameter from "../features/Settings/store/Parameter";
import settingRole from "../features/Settings/store/Role";
import settingPermission from "../features/Settings/store/Permission";

export default createStore({
    state,
    getters,
    mutations,
    actions,
    modules: {
        auth,
        policy,
        // User
        userProfile,
        userContract,
        userCopyist,
        userTrade,
        // Admin
        adminUser,
        adminContract,
        adminCopyist,
        adminComment,
        // Trading
        tradingDerivative,
        tradingShare,
        tradingShrstat,
        tradingDerstat,
        tradingFinbook,
        // Settings
        setting,
        settingFaq,
        settingParameter,
        settingRole,
        settingPermission,
    },
    strict: true,
});
