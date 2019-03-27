<template>
<nav>
  <ul>
    <li><nuxt-link to="/">Home</nuxt-link></li>
    <li><nuxt-link to="/posts">Posts</nuxt-link></li>
    <li><nuxt-link to="/schedule">schedule</nuxt-link></li>
  </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>