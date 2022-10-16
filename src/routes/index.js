const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@/pages/Home.vue"),
    meta: {
      title: "Home",
    },
  },
  {
    path: "/camera",
    name: "Camera",
    component: () =>
      import(/* webpackChunkName: "camera" */ "@/pages/Camera.vue"),
    meta: {
      title: "Camera",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "@/pages/Profile.vue"),
    meta: {
      title: "Profile",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/pages/Login.vue"),
    meta: {
      title: "Login",
      layout: "auth",
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "@/pages/Admin.vue"),
    meta: {
      title: "Admin",
    },
  },
  {
    path: "/spadmin",
    name: "SuperAdmin",
    component: () =>
      import(/* webpackChunkName: "spadmin" */ "@/pages/SuperAdmin.vue"),
    meta: {
      title: "SuperAdmin",
    },
  },
  {
    path: "/403",
    name: "403",
    component: () => import(/* webpackChunkName: "403" */ "@/pages/403.vue"),
    meta: {
      title: "403",
    },
  },
];

export default routes;
