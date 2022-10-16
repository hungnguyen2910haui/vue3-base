import apiHandler from "@/utils/apiHandler";
import API from "@/api/actions/product";
import notify from "@/plugins/notify";
import confirmModal from "@/plugins/confirmModal";
import { ref } from "vue";
import { useLoading } from "@/composables/useLoading";

const products = ref([]);

const { start, finish } = useLoading();

async function getProducts() {
  const handler = new apiHandler()
    .setOnStart(() => start())
    .setOnResponse((res) => {
      if (res) {
        products.value = res;
        notify.success("Thanh cong");
      } else confirmModal.error("That Bai");
    })
    .setOnFinally(() => finish());

  await API.getProducts(handler);
}

export function useProduct() {
  return { getProducts, products };
}
