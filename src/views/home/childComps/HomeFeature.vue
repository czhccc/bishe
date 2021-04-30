<template>
  <div class="home-feature">
    <a href="">
      <img :src="feature" alt="">
    </a>
  </div>
</template>

<script>
  export default {
    name: "HomeFeature",
    props: {
      feature: {
        type: String,
        default: ""
      }
    }
  }
</script>

<style scoped>
  .home-feature img {
    width: 100%;
  }
</style>