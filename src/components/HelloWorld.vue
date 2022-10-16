<template>
  <div class="hello">Hello World Component - provide + inject</div>
  <div>My name is : {{ userName }} - Job : {{ job }} / {{ Job }}</div>
  <div>Location :{{ location }}</div>
  <div>Address : {{ address }}</div>
  <div>{{ geolocation }}</div>
  <button @click="emitData">Emit</button>
</template>

<script>
import { inject, ref } from "vue";
export default {
  name: "HelloWorld",
  props: {
    job: {
      type: String,
    },
  },
  inject: ["geolocation", "address"],
  setup(props, { emit }) {
    const userName = inject("name");

    console.log(props.job);

    const emitData = () => emit("emit-data", userName);

    const Job = ref(props.job);

    const location = inject("location");

    return {
      userName,
      location,
      Job,
      emitData,
    };
  },
};
</script>
