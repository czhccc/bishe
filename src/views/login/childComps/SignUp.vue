<template>
  <div class="signUp">

    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template v-slot:center>
        <div class="title">账号注册</div>
      </template>
    </nav-bar>

    <van-field v-model="email" label="邮箱" placeholder="请输入邮箱" />
    <!-- <van-field
      v-model="sms"
      center
      clearable
      label="邮箱验证码"
      placeholder="请输入邮箱验证码" >
      <template #button>
        <van-button class="smsButton" size="small" type="primary" @click="send">发送验证码</van-button>
        <button :disabled="!countdown" v-bind:class="[countdown ? 'reg_active' : 'reg_disActive']" @click="getCode" >
          <span v-if="countdown">{{text}}</span>
          <span v-if="!countdown">{{text}} ({{count}})</span>
        </button>
      </template>
    </van-field> -->
    <van-field v-model="sms" clearable  maxlength="15" label="验证码" placeholder="请输入验证码">
      <van-button class="smsButton" :disabled="showCountdown" v-if='email.length >= 6 && showCountdown == true' ref="smsCode" slot="button" size="small"><van-count-down :time="time" @finish='countDownFinish' format=" ss 秒后重试" /></van-button>
      <van-button class="smsButton" v-else-if="email.length >=6"  @click="getSmsCode" slot="button" size="small">获取验证码</van-button>
      <van-button class="smsButton" v-else disabled slot="button" size="small">获取验证码</van-button>
    </van-field>
    <van-field v-model="tel" label="手机号" placeholder="请输入手机号" />
    <van-field v-model="newPassword" :right-icon="showPassword1 ? 'closed-eye' : 'eye'" @click-right-icon="eyeClick1" :type="showPassword1 ? 'password' : 'text'" label="新密码" placeholder="请输入6位及以上的密码" />
    <van-field v-model="confirmPassword" :right-icon="showPassword2 ? 'closed-eye' : 'eye'" @click-right-icon="eyeClick2" :type="showPassword2 ? 'password' : 'text'" label="确认新密码" placeholder="请确认密码" />

    <van-button class="btn" round @click="finish">完成</van-button>

  </div>
</template>


<script>
  import { Field, Notify, Button, CountDown } from 'vant';
  import NavBar from '../../../components/common/navBar/NavBar'

  import { getSms, signUp } from '../../../network/login'

  export default {
    name: 'SignUp',
    components: {
      [Field.name]: Field,
      [Button.name]: Button,
      [Notify.name]: Notify,
      [CountDown.name]: CountDown,
      NavBar,
    },
    props: {
      
    },
    data () {
      return {
        time: 60 * 1000,//倒计时的时间  毫秒级 60秒要*10000
        showCountdown: false,//是否显示倒计时
        email: '',
        tel: '',
        sms: '',
        newPassword: '',
        confirmPassword: '',
        showPassword1: true,
        showPassword2: 'password',
        currentIndex: 0,
      };
    },
    methods: {
      backClick() {
        this.$router.go(-1)
      },
      getSmsCode() {
        if(this.email == '') {
          Notify({ type: 'danger', message: '请输入邮箱' });
        } else {
          this.showCountdown = true
          getSms({
            receiveMailAccount: this.email,
            isForget: false
          }).then(res => {
          })
        }
      },
      countDownFinish(){//倒计时结束后的方法
        this.showCountdown = false //隐藏倒计时
      },
      finish() {
        if(this.email == '') {
          Notify({ type: 'danger', message: '请输入邮箱' });
        } else if(this.tel == '') {
          Notify({ type: 'danger', message: '请输入手机号' });
        } else if(this.sms == '') {
          Notify({ type: 'danger', message: '请输入邮箱验证码' });
        } else if(this.newPassword == '') {
          Notify({ type: 'danger', message: '请输入新密码' });
        } else if(this.newPassword.length <= 5) {
          Notify({ type: 'danger', message: '请输入6位及以上新密码' });
        } else if(this.newPassword != this.confirmPassword) {
          Notify({ type: 'danger', message: '两次密码不相同' });
        } else {
          signUp({
            email: this.email,
            password: this.password,
            phone: this.tel,
            record: this.sms
          }).then(res => {
            
          })
        }
      },
      eyeClick1() {
        this.showPassword1 = !this.showPassword1
      },
      eyeClick2() {
        this.showPassword2 = !this.showPassword2
      }
    },
  }
</script>

<style scoped>
  .smsButton {
    background-color: yellowgreen;
  }
  .btn {
    background: yellowgreen;
    width: 80%;
    margin-left: 50%;
    transform: translateX(-50%);
    color: white;
    margin-top: 20px;
  }
</style>