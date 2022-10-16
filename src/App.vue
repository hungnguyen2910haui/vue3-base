<template>
  <component :is="layout">
    <router-view />
  </component>
  <tab-one />
  <tab-two />
  <loading v-if="loading" />
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { PUBLIC_LAYOUT } from "@/constants";
import { useLoading } from "@/composables/useLoading";
import Loading from "@/components/Loading.vue";
import TabOne from "@/components/TabOne.vue";
import TabTwo from "@/components/TabTwo.vue";

export default {
  components: { Loading, TabTwo, TabOne },

  setup() {
    const route = useRoute();

    const { loading } = useLoading();

    return {
      layout: computed(() => (route.meta.layout || PUBLIC_LAYOUT) + "-layout"),
      loading,
    };
  },
  data() {
    return {
      number: 1,
    };
  },
  methods: {
    increment() {
      this.number += 1;
    },
  },
};
</script>
