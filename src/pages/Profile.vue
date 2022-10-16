<template>
  <div>Profile page</div>
  <router-link :to="{ name: 'Home' }">Home</router-link> |
  <router-link :to="{ name: 'Login' }">Login</router-link>

  <div class="mt-5">
    <a class="btn btn--blue" @click="removeToken">removeToken</a>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({
      removeToken: "auth/removeToken",
    }),
  },
};
</script>

<style>
.mt-5 {
  margin-top: 50px;
}
</style>
