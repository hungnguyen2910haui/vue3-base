import router from "@/config/router";
export default {
  login({ commit }) {
    commit("SET_TOKEN", "logined");
    commit("SET_USER", { typeAccount: "user", name: "User" });

    router.push({ name: "Home" });
  },

  removeToken({ commit }) {
    commit("SET_TOKEN", null);
  },
};
