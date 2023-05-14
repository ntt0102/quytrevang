import { createStore } from "vuex";

import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
// MODULES
import auth from "./modules/Auth";
import policy from "./modules/Policy";
// User
import userProfile from "./modules/User/Profile";
import userContract from "./modules/User/Contract";
import userTrade from "./modules/User/Trade";
// Admin
import adminUser from "./modules/Admin/User";
import adminContract from "./modules/Admin/Contract";
import adminComment from "./modules/Admin/Comment";
// Trading
import tradingStatistic from "./modules/Trading/Statistic";
import tradingOrder from "./modules/Trading/Order";
import tradingFinbook from "./modules/Trading/Finbook";
// Setting
import setting from "./modules/Setting/Index";
import settingFaq from "./modules/Setting/Faq";
import settingParameter from "./modules/Setting/Parameter";
import settingRole from "./modules/Setting/Role";
import settingPermission from "./modules/Setting/Permission";

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
        userTrade,
        // Admin
        adminUser,
        adminContract,
        adminComment,
        // Trading
        tradingStatistic,
        tradingOrder,
        tradingFinbook,
        // Setting
        setting,
        settingFaq,
        settingParameter,
        settingRole,
        settingPermission,
    },
    strict: true,
});
