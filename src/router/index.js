import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index"
import isAuth from "./middleware/authMiddleware";

import Home from "../views/Home.vue";
import Rooms from "../views/Rooms";
import Chat from "../views/Chat";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/rooms",
    name: "Rooms",
    meta: {
      middleware: [
        isAuth
      ]
    },
    component: Rooms,
  },
  {
    path: "/chat",
    name: "Chat",
    meta: {
      middleware: [
        isAuth
      ]
    },
    component: Chat,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store
  }
  return middleware[0]({
    ...context
  })
})

export default router;
