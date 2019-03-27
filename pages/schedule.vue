<template>
  <div class="maincontainer">
    <main role="main">{{days}}</main>
  </div>
</template>
<script>
import Strapi from 'strapi-sdk-javascript/build/main'
import { montharr, getday, convertdate, stringdate } from '~/helpers/getday.js'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  name: 'Shcedule',
  components: {},
  computed: {
    days() {
      return this.$store.getters['schedules/list']
    }
  },
  asyncData({ store, error }) {
    return strapi
      .request('post', '/graphql', {
        data: {
          query: `query {
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
        store.commit('schedules/emptyList')
        store.commit(
          'schedules/add',
          res.data.schedules.map(schedule => {
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
          message: `Api server error: ${e.message}`
        })
        console.error(e)
      })
  },
  methods: {}
}
</script>