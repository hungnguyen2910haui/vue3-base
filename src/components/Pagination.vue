<template>
  <div class="pagination">
    <a
      class="prev"
      :class="currentPage == 1 ? 'inactive' : 'active'"
      @click="changePage(currentPage > 1 ? currentPage - 1 : 1)"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </a>

    <span v-if="totalPage <= 10">
      <a
        v-for="page in totalPage"
        :key="page"
        class="page-number"
        :class="{ active: page == currentPage }"
        @click="changePage(page)"
      >
        {{ page }}
      </a>
    </span>

    <span
      v-if="totalPage > 10 && (currentPage < 4 || currentPage > totalPage - 3)"
    >
      <a
        v-for="n in 4"
        :key="n"
        class="page-number"
        :class="{ active: currentPage == n }"
        @click="changePage(n)"
      >
        {{ n }}
      </a>
      <a> ... </a>
      <a
        v-for="n in [3, 2, 1, 0]"
        :key="n"
        class="page-number"
        :class="{ active: currentPage == totalPage - n }"
        @click="changePage(totalPage - n)"
      >
        {{ totalPage - n }}
      </a>
    </span>

    <span
      v-if="totalPage > 10 && currentPage > 3 && currentPage < totalPage - 2"
    >
      <a
        class="page-number"
        :class="{ active: currentPage == 1 }"
        @click="changePage(1)"
      >
        1
      </a>
      <a> ... </a>
      <a
        v-for="n in [2, 1]"
        :key="n"
        class="page-number"
        @click="changePage(currentPage - n)"
      >
        {{ currentPage - n }}
      </a>
      <a class="active page-number" @click="changePage(currentPage)">
        {{ currentPage }}
      </a>
      <a
        v-for="n in 2"
        :key="n"
        class="page-number"
        @click="changePage(currentPage + n)"
      >
        {{ currentPage + n }}
      </a>
      <a> ... </a>
      <a
        class="page-number"
        :class="{ active: currentPage == totalPage }"
        @click="changePage(totalPage)"
      >
        {{ totalPage }}
      </a>
    </span>

    <a
      class="next"
      :class="currentPage == totalPage ? 'inactive' : 'active'"
      @click="
        changePage(currentPage < totalPage ? currentPage + 1 : currentPage)
      "
    >
      <v-icon>mdi-chevron-right</v-icon>
    </a>
  </div>
</template>

<script>
export default {
  name: "PagePagerComponent",

  props: {
    currentPage: {
      type: Number,
      default: 1,
    },

    totalPage: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    changePage(page) {
      if (page != this.currentPage && page <= this.totalPage && page >= 1)
        this.$emit("changePage", page);
    },
  },
};
</script>
