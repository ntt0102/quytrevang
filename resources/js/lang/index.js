import { createI18n } from "vue-i18n";
import { locale, loadMessages } from "devextreme/localization";
import devextremeVi from "./vi/devextreme.json";
import messageVi from "./vi/message.json";

const langDefault = "vi";
const devextremeMessages = { vi: devextremeVi };
loadMessages(devextremeMessages[window.lang]);
locale(window.lang);
window.moment.locale(window.lang);

export default createI18n({
    legacy: false,
    locale: window.lang || langDefault,
    fallbackLocale: window.lang || langDefault,
    messages: { vi: messageVi },
});
