// window.moment = require("moment");
import moment from "moment";
window.moment = moment;

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

// window.axios = require("axios");
import axios from "axios";
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');
window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;

/**
 * Set base URL
 */

let baseURL = document.head.querySelector('meta[name="base-url"]');
window.baseURL = baseURL.content;
window.axios.defaults.baseURL = baseURL.content + "/api";

/**
 * Set app name
 */
let appName = document.head.querySelector('meta[name="app-name"]');
window.appName = appName.content;
/**
 * Language of site
 */

window.lang = document.documentElement.lang;

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */
// import Echo from "laravel-echo";

// window.Pusher = require("pusher-js");

// window.Echo = new Echo({
//     broadcaster: "pusher",
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });
