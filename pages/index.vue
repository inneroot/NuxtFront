<template>
  <div class="maincontainer">
    <MainSlider/>
    <main role="main"></main>
    <section>
      <br>
      <ScheduleSlider :schedules="scheduleslist" :quantity="this.quan"/>
    </section>
  </div>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)
import {
  montharr,
  getday,
  convertdate,
  stringdate,
  getWeekDay
} from '~/helpers/getday.js'
import MainSlider from '~/components/MainSlider.vue'
import ScheduleSlider from '~/components/ScheduleSlider.vue'

export default {
  name: 'Index',
  components: {
    MainSlider,
    ScheduleSlider
  },
  data: () => {
    return {
      quan: 4
    }
  },
  computed: {
    scheduleslist() {
      return this.$store.getters['schedules/list']
    }
  },
  asyncData({ store, error }) {
    return strapi
      .request('post', '/graphql', {
        data: {
          query: `query {
            slides {
              image {
                id
                url
              }
            }
            posts (limit: 10, start: 0, sort: "date:desc"){
              id
              title
              date
              image {
                url
              }
            }
            schedules (where: { date_gt: "${getday()}" }) {
              date
              title
              services
              color
            }
          }
          `
        }
      })
      .then(res => {
        store.commit('posts/emptyList')
        store.commit(
          'posts/add',
          res.data.posts.map(post => {
            post.image.url = `${apiUrl}${post.image.url}`
            return post
          })
        )
        store.commit('slides/emptyList')
        store.commit(
          'slides/add',
          res.data.slides.map(slide => {
            slide.image.url = `${apiUrl}${slide.image.url}`
            return slide
          })
        )
        store.commit('schedules/emptyList')
        store.commit(
          'schedules/add',
          res.data.schedules.map(schedule => {
            schedule.weekday = getWeekDay(schedule.date)
            let dateobj = convertdate(schedule.date)
            schedule.date = `${dateobj.day} ${
              montharr[parseInt([dateobj.month], 10) - 1]
            }`

            return schedule
          })
        )
      })
      .catch(e => {
        error({
          statusCode: 503,
          message: `${e}`
        })
        console.error(e)
      })
  },
  beforeMount() {
    this.quant()
  },
  methods: {
    quant() {
      if (screen.width > 600) {
        this.quan = screen.width / 400
      } else {
        this.quan = 1
      }
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
