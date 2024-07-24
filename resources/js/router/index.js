import { getCurrentInstance } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import store from "../store";

const vm = getCurrentInstance();
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

// Register before guard.
router.beforeEach(async (to, from, next) => {
    await store.dispatch("auth/check");
    //
    let nextRoute = {};
    const isLoggedin = store.state.auth.user.code;
    if (to.name != "policy") {
        if (isLoggedin) {
            const permissions = store.state.auth.user.permissions;
            if (
                (!!to.meta.permissions &&
                    !permissions.some((p) =>
                        to.meta.permissions.includes(p)
                    )) ||
                !to.meta.auth
            )
                nextRoute.name = "overview";
        } else if (to.meta.auth)
            nextRoute = {
                name: "login",
                query: {
                    ...{ redirect: to.name },
                    ...to.query,
                },
                hash: to.hash,
            };
    }
    if (Object.keys(nextRoute).length === 0) next();
    else next(nextRoute);
});

// Register after hook.
router.afterEach((to, from) => {
    document.title = to.meta.title || vm.proxy.$appName;
});

export default router;
