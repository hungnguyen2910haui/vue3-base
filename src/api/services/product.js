import URLS from "@/api/url/product";
import axios from "axios";

export default {
  getProducts() {
    return axios.get(URLS.GET_PRODUCTS);
  },
};
