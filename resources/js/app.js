import "../sass/app.scss";
import "./bootstrap";
import "./config";
import { createApp } from "vue";
import filters from "./filters";
import properties from "./properties";
import plugins from "./plugins";
import router from "./router";
import store from "./store";
import lang from "./lang";
import themes from "devextreme/ui/themes";

import App from "./App.vue";

themes.initialized(() => {
    const app = createApp(App);

    app.use(lang);
    app.use(filters);
    app.use(properties);
    app.use(plugins);
    app.use(store);
    app.use(router);

    app.mount("#app");
});
