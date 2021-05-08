<template>
  <div class='profileTop'>
    <div class="middle">
      <div v-if="loginPhone.length > 0">
        <div class="login">
          <span>欢迎您</span>
        </div>
        <div class="phone">
          <img src="~/assets/img/profile/phone.svg" alt="">
          <span>{{loginPhone}}</span>
        </div>
      </div>
      <div v-else @click="toLogin">
        <div class="login">
          <span>登录 / 注册</span>
        </div>
        <div class="phone">
          <img src="~/assets/img/profile/phone.svg" alt="">
          <span>暂无绑定手机号</span>
        </div>
      </div>
      <div class="arrow">
        <van-icon name="arrow" />
      </div>
    </div>

  </div>
</template>

<script>
  import { Icon } from 'vant';

  export default {
    name: 'ProfileTop',
    components: {
      [Icon.name]: Icon
    },
    data () {
      return {
        loginPhone: "",
        loginAmount: 0,
      }
    },
    methods: {
      toLogin() {
        this.$router.push('/login')
      }
    },
    activated() {
      this.loginPhone = this.$store.getters.getUserPhone
    },
  }
</script>

<style scoped>
  .middle {
    position: relative;
    color: white;
    background-color: var(--color-tint);
    height: 90px;
  }
  .avatar {
    position: relative;
  }
  .login span {
    position: absolute;
    margin-left: 50px;
    margin-top: 25px;
  }
  .phone img {
    width: 25px;
    height: 20px;
    position: absolute;
    margin-left: 43px;
    margin-top: 50px;
  }
  .phone span {
    font-size: 13px;
    position: absolute;
    margin-left: 65px;
    margin-top: 53px;
  }
  .arrow {
    position: absolute;
    margin-left: 330px;
    margin-top: 36px;
  }
</style>