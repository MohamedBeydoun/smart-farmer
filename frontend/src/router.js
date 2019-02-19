import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Comparator from "./views/Comparator.vue";
import Table from "./views/FarmingTable.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/comparator",
            name: "comparator",
            component: Comparator
        },
        {
            path: "/table",
            name: "table",
            component: Table
        }
    ]
});
