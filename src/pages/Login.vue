<template>
  <div class="login">
    <h1>This is an login page</h1>
    <a @click="login" class="btn btn--blue">Login</a>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({
      login: "auth/login",
    }),
  },
};
</script>
