import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "users",

      component: () => import("./views/Users.vue")
    },
    {
      path: "/users",
      name: "users",

      component: () => import("./views/Users.vue")
    },
    {
      path: "/users/:id",
      name: "user",

      component: () => import("./views/User.vue")
    },
    {
      path: "/createUser",
      name: "createUser",

      component: () => import("./views/CreateUser.vue")
    }
  ]
});
