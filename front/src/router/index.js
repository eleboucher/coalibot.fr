import Vue from "vue";
import VueRouter from "vue-router";
import isAuthenticated from "../auth/isAuthenticated";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Cursus from "../views/Cursus.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/cursus/:cursus_id",
    name: "Cursus",
    component: Cursus,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
