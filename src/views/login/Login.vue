<template>
  <div class="login">

    <nav-bar>
      <template v-slot:center>
        账号登录
      </template>
    </nav-bar>

    <div class="logo">
      网上购物商城
    </div>

    <div class="content">
      <van-field v-model="account" label="账号" placeholder="请输入账号" />
      <!-- <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" /> -->
      <van-field v-model="password" :right-icon="showPassword1 ? 'closed-eye' : 'eye'" @click-right-icon="eyeClick1" :type="showPassword1 ? 'password' : 'text'" label="密码" placeholder="请输入密码" />
      <div class="signInButtonWrap">
        <van-button class="signInButton" round type="info" @click="toLogin">
          登录
        </van-button>
      </div>
    </div>

    <div class="tips">
      <div class="signUp" @click="signUp">
        注册
      </div>
      <div class="forgetPassword" @click="forgetPassword">
        忘记密码
      </div>
    </div>

  </div>
</template>


<script>
  import { Field, Button, Notify } from 'vant';
  import NavBar from '../../components/common/navBar/NavBar'

  import { login } from '../../network/login'
  import * as types from '../../store/mutation-types'

  export default {
    name: 'Login',
    components: {
      [Field.name]: Field,
      [Button.name]: Button,
      [Notify.name]: Notify,
      NavBar
    },
    data () {
      return {
        account: '',
        password: '',
        showPassword1: true,
      };
    },
    methods: {
      toLogin() {
        login({
          phone: this.account,
          password: this.password
        }).then(res => {
          console.log(res)
          if (res.data.code == '200') {
            Notify({ type: 'danger', message: '登陆成功' });
            this.$store.commit(types.USER_PHONE, res.data.personInfo.phone)
            this.$store.commit(types.USER_AMOUNT, res.data.personInfo.amount)
            setTimeout(() => {
              this.$router.push('/home')
            }, 1000)
          } else {
            Notify({ type: 'danger', message: `${res.data.message}` });
          }
        })
      },
      signUp() {
        this.$router.push('/signUp')
      },
      forgetPassword() {
        console.log('忘记密码')
        this.$router.push('/forgetPassword')
      },
      eyeClick1() {
        this.showPassword1 = !this.showPassword1
      },
    },
  }
</script>

<style scoped>
  .logo {
    margin: 0 auto;
    text-align: center;
    font-size: 40px;
    color: pink;
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .signUp {
    font-size: 14px;
  }
  .forgetPassword {
    font-size: 14px;
  }
  .signInButtonWrap {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  .signInButton {
    background: #FF8198;;
    border: none;
    width: 80%;
  }
  .tips {
    display: flex;
    justify-content: space-between;
    margin: 0 15px;
    margin-top: 20px;
  }
</style>