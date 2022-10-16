import { createStore } from "vuex";
import product from "@/store/product";
import auth from "@/store/auth";

export default createStore({
  state: {
    user: "hung",
  },
  modules: {
    product: product,
    auth: auth,
  },
});
