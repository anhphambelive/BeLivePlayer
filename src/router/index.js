import Vue from "vue";
import VueRouter from "vue-router";
import CheckPlayer from "../pages/CheckPlayer";
import NotFoundView from "../pages/404";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "CheckPlayer",
        component: CheckPlayer
    },
    { path: '*', name: 'NotFound', component: NotFoundView },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
