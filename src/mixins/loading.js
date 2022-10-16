export default {
  data() {
    return {
      loading: false,
      done: false,
    };
  },

  methods: {
    start() {
      done.value = true;
      setTimeout(() => {
        if (done.value) loading.value = true;
      }, 2000);
    },

    finish() {
      loading.value = false;
      done.value = false;
    },
  },
};
