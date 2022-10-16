<template>
  <div class="home">
    <div class="red--text">Home Page</div>
    <router-link :to="{ name: 'Profile' }">Profile</router-link> |
    <router-link :to="{ name: 'Login' }">Login</router-link> |
    <router-link :to="{ name: 'SuperAdmin' }">SuperAdmin</router-link> |
    <router-link :to="{ name: 'Admin' }">Admin</router-link>

    <wellcome />

    <div class="mt-5">
      <a class="btn btn--blue" @click="getProducts">getProducts</a>
    </div>

    <div class="mt-5" v-if="products.length">
      <div v-for="(product, index) in products" :key="index">
        {{ product.id + " - " + product.title }}
      </div>
    </div>

    <div class="mt-5">filter : {{ filter }}</div>

    <div class="mt-5">{{ todo }}</div>

    <tab-one />
    <tab-two />
  </div>
</template>

<script>
import { computed, onMounted, watch, ref, onBeforeMount, provide } from "vue";
import { useProduct } from "@/composables/useProduct";
import Wellcome from "../components/Wellcome.vue";
import TabOne from "../components/TabOne.vue";

import TabTwo from "../components/TabTwo.vue";

export default {
  components: { Wellcome, TabTwo, TabOne },
  provide: {
    location: "Việt Nam",
    address: "Mỹ Đình",
    geolocation: {
      longitude: 90,
      latitude: 135,
    },
  },

  setup() {
    provide("name", "Nguyễn Xuân Hùng");

    const { getProducts, products } = useProduct();

    //ref dùng cho string,number, boolean
    //reactive dùng cho array, object
    //nhưng reactive chỉ thay đổi được value của thuộc tính trong array, hoặc object
    //muốn thay đổi toàn bộ array, object thì dùng ref

    const todo = ref([
      {
        name: "name",
        type: [
          {
            text: "1",
            number: 1,
          },
          {
            text: "2",
            number: 2,
          },
        ],
      },
      {
        name: "name 2",
        type: [
          {
            text: "3",
            number: 3,
          },
          {
            text: "4",
            number: 4,
          },
        ],
      },
    ]);

    const filter = computed(() =>
      products.value.filter((product) => product.id == 3)
    );

    watch(products, () => {
      console.log("watch");
      console.log(todo);

      todo.value = todo.value.map((item) => ({
        name: item.name,
        text: item.type[1].text,
        number: item.type[1].number,
      }));
      console.log(todo.value);
    });

    onBeforeMount(() => {
      getProducts();
    });

    onMounted(() => {
      console.log(todo);

      console.log(products);
      console.log(filter);
      console.log(products.value.filter((product) => product.id == 3));
    });

    return { getProducts, products, filter, todo };
  },
};
</script>

<style>
.mt-5 {
  margin-top: 50px;
}
</style>
