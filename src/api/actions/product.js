import responseHandler from "@/utils/responseHandler";
import SERVICES from "@/api/services/product";

export default {
  async getProducts(handler) {
    const onRequest = async () => {
      const rawData = await SERVICES.getProducts();
      const response = new responseHandler(rawData);

      return response.data;
    };

    await handler.setOnRequest(onRequest).execute();
  },
};
