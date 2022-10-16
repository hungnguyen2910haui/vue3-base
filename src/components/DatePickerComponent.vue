<template>
  <div class="date-picker">
    <input-component
      placeholder="生年月日"
      :value="date"
      @handle-change="date = $event"
      :error="
        date && !constFunc.validateFormatDate(date) ? 'sai dinh dang' : ''
      "
      @click="isShowCalendar = true"
    />

    <div
      class="calendar"
      style="position: absolute"
      v-if="isShowCalendar"
      v-click-outside="onOutside"
    >
      <div class="calendar-header">
        <span
          class="month-picker"
          id="month-picker"
          @click="isShowMonth = !isShowMonth"
        >
          {{ months[monthSelected].name }}
        </span>
        <div class="year-picker">
          <span class="year-change" id="prev-year" @click="yearSelected -= 1">
            <pre><v-icon>mdi-chevron-left</v-icon></pre>
          </span>
          <span id="year">{{ yearSelected }}</span>
          <span class="year-change" id="next-year" @click="yearSelected += 1">
            <pre><v-icon>mdi-chevron-right</v-icon></pre>
          </span>
        </div>
      </div>
      <div class="calendar-body">
        <div class="calendar-week-day" v-if="!isShowMonth">
          <div v-for="(day, i) in weekDays" :key="i">{{ day }}</div>
        </div>
        <div class="calendar-days" v-if="!isShowMonth">
          <div
            class="hidden"
            v-for="(day, i) in fisrtDay.getDay()"
            :key="i"
          ></div>
          <div
            v-for="(day, i) in days"
            :key="i"
            :class="{
              'day-selected': isSelectedDay(day),
              'current-day': isCurrentDay(day),
            }"
            @click="daySelected = day"
          >
            <span>{{ day }}</span>
          </div>
        </div>
      </div>

      <div class="month-list" v-if="isShowMonth" :class="{ show: isShowMonth }">
        <div
          v-for="(month, i) in months"
          :key="i"
          :class="{
            'month-selected': isSelectedMonth(month.value),
            'current-month': isCurrentMonth(month.value),
          }"
          @click="(monthSelected = month.value), (isShowMonth = !isShowMonth)"
        >
          {{ month.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputComponent from "@/components/InputComponent.vue";
import constFunc from "@/common/constFunc.js";

export default {
  components: {
    InputComponent,
  },

  props: {
    dateDefault: {
      type: String,
      default: "",
      required: true,
    },
  },

  data() {
    return {
      date: "",
      constFunc: constFunc,
      isShowMonth: false,
      isShowCalendar: false,
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      yearSelected: null,
      monthSelected: null,
      daySelected: null,
      nowYear: new Date().getFullYear(),
      nowMonth: new Date().getMonth(),
      nowDay: new Date().getDate(),
      dateSelected: this.dateDefault,
    };
  },

  watch: {
    daySelected: {
      handler() {
        if (!this.yearSelected || !this.monthSelected || !this.daySelected) {
          const [
            yearSelectedDefault,
            monthSelectedDefault,
            daySelectedDefault,
          ] = this.dateSelected.split("-");
          this.yearSelected = Number(yearSelectedDefault);
          this.monthSelected = Number(monthSelectedDefault) - 1;
          this.daySelected = Number(daySelectedDefault);
        }
        const yearSelected = this.pad2(this.yearSelected);
        const monthSelected = this.pad2(this.monthSelected + 1);
        const daySelected = this.pad2(this.daySelected);
        this.dateSelected = `${yearSelected}-${monthSelected}-${daySelected}`;

        if (constFunc.validateDate(this.dateSelected)) {
          this.date = constFunc.formatDate(
            new Date(this.dateSelected),
            "yyyy年mm月dd日"
          );
          this.$emit("change-date", this.dateSelected);
        }
      },
      immediate: true,
    },

    date() {
      const date = this.date;
      const yearSelected = date.substr(0, 4);
      const monthSelected = date.substr(5, 2);
      const daySelected = date.substr(8, 2);
      this.dateSelected = `${yearSelected}-${monthSelected}-${daySelected}`;

      if (constFunc.validateDate(this.dateSelected)) {
        this.$emit("change-date", this.dateSelected);
      }
    },
  },

  computed: {
    fisrtDay() {
      return new Date(this.yearSelected, this.monthSelected, 1);
    },

    days() {
      return this.months.find((o) => o.value == this.monthSelected).days;
    },

    months() {
      return [
        { name: "January", value: 0, days: 31 },
        {
          name: "February",
          value: 1,
          days: this.getFebDays(this.yearSelected),
        },
        { name: "March", value: 2, days: 31 },
        { name: "April", value: 3, days: 30 },
        { name: "May", value: 4, days: 31 },
        { name: "June", value: 5, days: 30 },
        { name: "July", value: 6, days: 31 },
        { name: "August", value: 7, days: 31 },
        { name: "September", value: 8, days: 30 },
        { name: "October", value: 9, days: 31 },
        { name: "November", value: 10, days: 30 },
        { name: "December", value: 11, days: 31 },
      ];
    },
  },

  methods: {
    pad2(number) {
      return (number < 10 ? "0" : "") + number;
    },

    isLeapYear(year) {
      return (
        (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
        (year % 100 === 0 && year % 400 === 0)
      );
    },

    getFebDays(year) {
      return this.isLeapYear(year) ? 29 : 28;
    },

    isCurrentDay(day) {
      return (
        this.nowDay == day &&
        this.nowMonth == this.monthSelected &&
        this.nowYear == this.yearSelected
      );
    },

    isCurrentMonth(month) {
      return this.nowMonth == month && this.nowYear == this.yearSelected;
    },

    isSelectedDay(day) {
      const [yearSelected, monthSelected, daySelected] =
        this.dateSelected.split("-");

      return (
        this.daySelected == day &&
        this.daySelected == daySelected &&
        this.monthSelected == monthSelected - 1 &&
        this.yearSelected == yearSelected
      );
    },

    isSelectedMonth(month) {
      return (
        this.monthSelected == month &&
        this.yearSelected == this.dateSelected.split("-")[0]
      );
    },

    onOutside() {
      const [yearSelected, monthSelected, daySelected] =
        this.dateSelected.split("-");
      this.yearSelected = Number(yearSelected);
      this.monthSelected = Number(monthSelected) - 1;
      this.daySelected = Number(daySelected);

      this.isShowCalendar = false;
      this.isShowMonth = false;
    },
  },
};
</script>

<style lang="scss">
.date-picker {
  --light-body: #f3f8fe;
  --light-main: #fdfdfd;
  --light-second: #c3c2c8;
  --light-hover: #edf0f5;
  --light-text: #151426;
  --blue: #0000ff;
  --white: #fff;
  --shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  --font-family: cursive;

  --bg-body: var(--light-body);
  --bg-main: var(--light-main);
  --bg-second: var(--light-second);
  --color-hover: var(--light-hover);
  --color-txt: var(--light-text);

  position: relative;

  .calendar {
    width: 300px !important;
    top: 65px;
    z-index: 10;
    background-color: white;
    border-radius: 20px;
    padding: 8px;
    overflow: hidden;
    box-shadow: 2px 2px 10px 2px #c3c2c8;
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 25px;
    font-weight: 600;
    color: var(--color-txt);
    padding: 0 10px;
  }

  .calendar-body {
    margin: 10px;
  }

  .calendar-week-day {
    height: 30px;
    font-size: 12px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    font-weight: 400;
  }

  .calendar-week-day div {
    display: grid;
    place-items: center;
    color: var(--bg-second);
  }

  .calendar-days {
    font-size: 14px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
    color: var(--color-txt);
  }

  .calendar-days div {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    position: relative;
    cursor: pointer;

    &:hover {
      border-radius: 50%;
      border: 1px solid red;
    }
  }

  .calendar-days div:hover span {
    transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
  }

  .calendar-days div.curr-date,
  .calendar-days div.curr-date:hover {
    background-color: var(--blue);
    color: var(--white);
    border-radius: 50%;
  }

  .calendar-days div.curr-date span {
    display: none;
  }

  .month-picker {
    font-size: 16px;
    padding: 5px 10px;
    border-radius: 10px;
    cursor: pointer;
  }

  .month-picker:hover {
    background-color: var(--color-hover);
  }

  .year-picker {
    font-size: 16px;
    display: flex;
    align-items: center;
  }

  .year-change {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    cursor: pointer;
  }

  .year-change:hover {
    background-color: var(--color-hover);
  }

  .month-list {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: var(--bg-main);
    padding: 10px 0;
    grid-template-columns: repeat(3, auto);
    gap: 10px;
    display: grid;
  }

  .month-list.show {
    transform: scale(1);
    visibility: visible;
    pointer-events: visible;
    transition: all 0.2s ease-in-out;
  }

  .month-list > div {
    cursor: pointer;
    padding: 3px 0;
    font-size: 14px;
    display: grid;
    place-items: center;
    animation: to-top 1s forwards;
    &:hover {
      background: #edf0f5;
      border-radius: 5px;
    }
  }

  .hidden {
    user-select: none;
    pointer-events: none;
  }

  %selected {
    background: blue !important;
    color: white;
    &:hover {
      color: var(--color-txt);
    }
  }

  .day-selected {
    border-radius: 50%;
    @extend %selected;
  }

  .month-selected {
    border-radius: 8px;
    @extend %selected;
  }

  %current {
    background: #c6ebfc;
    color: white;
    &:hover {
      color: var(--color-txt);
    }
  }

  .current-day {
    border-radius: 50%;
    @extend %current;
  }

  .current-month {
    border-radius: 8px;
    @extend %current;
  }

  @keyframes to-top {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
}
</style>
