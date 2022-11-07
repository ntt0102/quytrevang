import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);
require("moment/locale/" + window.lang);
window.moment.locale(window.lang);

function loadLocaleMessages() {
    const locales = require.context(
        "../locales",
        true,
        /[A-Za-z0-9-_,\s]+\.json$/i
    );
    const messages = {};
    locales.keys().forEach(key => {
        const matched = key.match(/([a-z0-9]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = locales(key);
        }
    });
    return messages;
}

export default new VueI18n({
    locale: window.lang || "en",
    fallbackLocale: window.lang || "en",
    messages: loadLocaleMessages()
});
