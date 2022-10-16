import { ref } from "vue";

const loading = ref(false);
const done = ref(false);

function start() {
  done.value = true;
  setTimeout(() => {
    if (done.value) loading.value = true;
  }, 2000);
}

function finish() {
  loading.value = false;
  done.value = false;
}

export function useLoading() {
  return { start, finish, loading };
}
