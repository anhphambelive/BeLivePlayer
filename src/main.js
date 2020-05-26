import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Register validation globally
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

import {BootstrapVue, IconsPlugin} from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import Axios from "axios";

import VueCookies from "vue-cookies";
// import plugin
import VueToastr from "vue-toastr";
import UUID from "vue-uuid";

Axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
Axios.defaults.headers.common["beliveLicenseKey"] = BELIVESDK_WEB_APP_KEY;
Vue.prototype.$http = Axios;

Vue.use(UUID);

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(VueCookies);

// use plugin
Vue.use(VueToastr, {
	/* OverWrite Plugin Options if you need */
});

import { library } from '@fortawesome/fontawesome-svg-core'
import { faVideo, faVideoSlash, faCheck, faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faVideo, faVideoSlash, faCheck, faMicrophone, faMicrophoneSlash);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(require('vue-cookies'));

// Vue-table
import {ServerTable, ClientTable, Event} from 'vue-tables-2';
Vue.use(ServerTable);

// set default config
Vue.$cookies.config('7d');

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
