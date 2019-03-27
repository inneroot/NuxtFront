<template>
  <hooper :itemsToShow="quantity" ref="hoopercontainer">
    <slide v-for="schedule in schedules" v-bind:key="schedule.id" class="schedule_slide">
      <div class="date" v-bind:style="{ color: schedule.color}">{{schedule.date}}</div>
      <div class="weekday">{{schedule.weekday}}</div>
      <div class="title" v-html="schedule.title"></div>
      <hr v-bind:class="schedule.color">
      <div class="services" v-html="schedule.services"></div>
    </slide>
    <hooper-navigation slot="hooper-addons"></hooper-navigation>
  </hooper>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper'
import 'hooper/dist/hooper.css'

export default {
  name: 'Slider',
  components: {
    Hooper,
    Slide,
    HooperNavigation
  },
  props: { schedules: Array, quantity: Number },
  data: () => {
    return {
      x: 0
    }
  },
  computed: {
    comp_quantity() {
      return this.$refs.hoopercontainer.clientWidth
    }
  },
  mounted() {
    console.log(this.$refs.hoopercontainer)
    this.getWindowWidth()
  },
  methods: {
    getWindowWidth() {
      return screen.width
    }
  }
}
</script>

<style>
.date {
  text-align: center;
}
.weekday {
  text-align: center;
}
.hooper {
  height: 100%;
}
.schedule_slide {
  background: #aaa;
  height: inherit;
  border-radius: 10px;
  padding: 5px;
  margin-right: 3px;
}
.LightGray {
  border-color: lightgray;
}
.Purple {
  border-color: purple;
}
.Black {
  border-color: black;
}
</style>