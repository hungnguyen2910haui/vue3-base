<template>
  <div class="filter-pulldown">
    <div class="select" v-click-outside="onOutside">
      <input
        ref="input"
        v-model="itemValue"
        :placeholder="placeHolder"
        @focus="onFocus"
      />
      <div class="icon-group">
        <v-icon class="icon-close" v-show="itemValue" @click="onClear">
          mdi-close
        </v-icon>
        <v-icon :class="!typing ? 'icon-close' : 'icon-up'">
          mdi-menu-down
        </v-icon>
      </div>
      <div
        class="data-list"
        v-if="typing && itemsFilterData.length && itemText"
      >
        <div
          class="data"
          v-for="(item, i) in itemsFilter"
          :key="i"
          @click="selectData(item)"
        >
          {{ item[itemText] }}
        </div>
      </div>
      <div class="data-list" v-if="noResult">
        <div class="no-result">{{ noDataText }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },

    itemText: {
      type: String,
      required: true,
      default: "",
    },

    placeHolder: {
      type: String,
      default: "すべて",
    },

    noDataText: {
      type: String,
      default: "データなし",
    },
  },

  data() {
    return {
      itemValue: null,
      typing: false,
      itemsFilterData: [],
    };
  },

  computed: {
    itemsFilter() {
      return this.itemText
        ? this.itemValue
          ? this.searchItemArray(
              this.itemsFilterData,
              this.itemText,
              this.itemValue
            )
          : this.itemsFilterData
        : [];
    },

    noResult() {
      return this.itemsFilter.length || !this.typing ? false : true;
    },
  },

  created() {
    this.itemsFilterData = this.filterItemNotValue(this.items, this.itemText);
  },

  methods: {
    filterItemNotValue(items = [], value) {
      return items.filter((item) => item[value] != null);
    },

    searchItemArray(items = [], itemText, value) {
      return items.filter((item) =>
        item[itemText]
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase())
      );
    },

    selectData(item) {
      this.itemValue = item[this.itemText];
      this.typing = false;
    },

    onOutside() {
      this.typing = false;
    },

    onClear() {
      this.itemValue = null;
      this.focus();
    },

    onFocus() {
      this.typing = true;
    },

    focus() {
      this.$refs.input.focus();
    },
  },
};
</script>
