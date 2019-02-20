import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import VueFrappe from "vue2-frappe"
Vue.config.productionTip = false;

Vue.use(VueFrappe);

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
