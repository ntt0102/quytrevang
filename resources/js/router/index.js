import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "../store";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

let router = make(routes({ authGuard, guestGuard }));
export default router;

function make(routes) {
    const router = new VueRouter({
        routes,
        scrollBehavior,
        mode: "history"
    });

    // Register before guard.
    router.beforeEach(async (to, from, next) => {
        await store.dispatch("Auth/fetch");
        //
        let nextRoute = {};
        const isLoggedin = store.getters["Auth/isLoggedin"];
        if (to.name != "policy") {
            if (isLoggedin) {
                const permissions = store.getters["Auth/permissions"];
                if (
                    (!!to.meta.permission &&
                        !permissions.includes(to.meta.permission)) ||
                    !to.matched[0].meta.auth
                )
                    nextRoute.name = "overview";
            } else if (to.matched[0].meta.auth)
                nextRoute = {
                    name: "login",
                    query: {
                        ...{ redirect: to.name },
                        ...to.query
                    },
                    hash: to.hash
                };
        }
        if (Object.keys(nextRoute).length === 0) next();
        else router.push(nextRoute);
    });

    // Register after hook.
    router.afterEach((to, from) => {
        router.app.$nextTick(() => {
            // router.app.$loading.finish()
            document.title = to.meta.title || Vue.prototype.$appName;
        });
    });

    return router;
}

function authGuard(routes) {
    return beforeEnter(routes, (to, from, next) => {
        next();
    });
}

function guestGuard(routes) {
    return beforeEnter(routes, (to, from, next) => {
        next();
    });
}

function beforeEnter(routes, beforeEnter) {
    return routes.map(route => {
        return { ...route, beforeEnter };
    });
}

function scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition;
    }

    if (to.hash) {
        return new Promise((resolve, reject) => {
            setTimeout(
                () =>
                    resolve({
                        selector: to.hash,
                        behavior: "smooth"
                    }),
                500
            );
        });
    }

    if (to.matched.some(m => m.meta.scrollToTop)) {
        return { x: 0, y: 0 };
    }
}
