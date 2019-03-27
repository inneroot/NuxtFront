<template>
  <div class="maincontainer">
    <main role="main">{{post}}</main>
  </div>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  asyncData({ params, error }) {
    return strapi
      .request('post', '/graphql', {
        data: {
          query: `query {
          post (id: ${params.id}){
            id
            title
            date
            image {
              url
            }
          }
        }
        `
        }
      })
      .then(res => {
        console.log(res)
        return { post: res.data }
      })
      .catch(e => {
        error({ statusCode: 404, message: `${e.message}` })
      })
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
