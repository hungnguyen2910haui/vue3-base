<template>
  <div>Wellcome Component</div>

  <component :is="currentTab"></component>

  <input :class="{ hidden: hidden }" v-click-outside="hiddenEl" />

  <div>
    <div v-for="(tab, i) in tabs" :key="i">
      <button @click="currentTab = tab.content">{{ tab.content }}</button>
    </div>
  </div>

  <!-- <hello-world :job="'IT'" @emit-data="dataEmit = $event" /> -->

  <!-- <fillter-pulldown :item-text="'text'" :items="list" /> -->

  <!-- <div>Data Emit {{ dataEmit }}</div> -->
</template>

<script>
import TabOne from "@/components/TabOne";
import TabTwo from "@/components/TabTwo";
// import HelloWorld from "./HelloWorld.vue";

export default {
  components: {
    TabOne,
    TabTwo,
  },
  data() {
    return {
      hidden: false,
      dataEmit: null,
      currentTab: "TabOne",
      tabs: [
        { title: "tab 1", content: "TabOne" },
        { title: "tab 2", content: "TabTwo" },
      ],
      list: [
        {
          id: "1",
          value: "1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          text: "tao",
        },
        {
          id: "2",
          value: "13bbb",
          text: "tao1",
        },
        {
          id: "3",
          value: "115ccc",
          text: "tao2",
        },
        {
          id: "4",
          value: "21abc",
          text: "tao",
        },
        {
          id: "5",
          value: "25dd",
          text: "tao4",
        },
        {
          id: "6",
          value: "18",
          text: "tao4",
        },
        {
          id: "12",
          value: "1",
          text: "tao5",
        },
        {
          id: "15",
          value: "13",
          text: null,
        },
        {
          id: "11",
          value: "115",
          text: null,
        },
        {
          id: "21",
          value: "21",
          text: "ok",
        },
        {
          id: "23",
          value: "25",
          text: "khong ok",
        },
        {
          id: "12",
          value: "18",
          text: null,
        },
      ],
    };
  },

  methods: {
    hiddenEl() {
      this.hidden = !this.hidden;
    },
    changeTab(tab) {
      console.log(tab);
      this.currentTab = tab;
    },
  },
};
</script>

<style>
.hidden {
  display: none;
}
</style>
