export default {
  fetchProducts({ commit }, hanndler) {
    const products = hanndler.data.products;
    commit("SET_PRODUCTS", products);
  },
};
