<template>
  <div class="collection">

    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template v-slot:center>
        <div class="title">我的收藏</div>
      </template>
    </nav-bar>

    我的收藏

  </div>
</template>


<script>
  import NavBar from "components/common/navBar/NavBar";

  export default {
    name: 'Collection',
    components: {
      NavBar
    },
    props: {
      
    },
    data () {
      return {
        
      };
    },
    computed: {
      
    },
    created() {
      let loginPhone = this.$store.getters.getUserPhone
      if (!loginPhone) {
        this.$router.replace('/login')
      }
    },
    methods: {
      backClick() {
        this.$router.go(-1)
      }
    },
  }
</script>

<style scoped>
  
</style>