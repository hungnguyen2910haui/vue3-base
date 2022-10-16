import { createRouter, createWebHistory } from "vue-router";

import routes from "@/routes";
// import auth from "@/store/auth";
// import authorized from "@/middleware/authorized";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // const isAuthenticated = auth.state.token ? true : false;
  // const isAuthorized = authorized(to);
  // if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
  // else if (isAuthenticated && !isAuthorized) next("403");
  // else next();
  next();
});

router.beforeResolve((to, from, next) => {
  // if (to.name) {
  //   document.title = to.meta.title || "Home";
  // }
  next();
});

export default router;
