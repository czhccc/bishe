<template>
  <div class="order">

    <nav-bar>
      <template v-slot:left>
        <img class="back" src="~assets/img/common/back.svg" @click="backClick" alt="">
      </template>
      <template v-slot:center>
        <div class="title">我的订单</div>
      </template>
    </nav-bar>

    <div class="cart-list">
      <scroll class="content" ref="scroll">
        <!-- <div class="cart-list-item" v-for="(item, index) in goodsList" :key="index"> -->
        <div class="address">
          阿米娅 13989536936<br>
          罗德岛罗德岛罗德岛罗德岛罗德岛罗德岛罗德岛罗德岛罗德岛罗德岛罗德岛罗德岛罗德岛罗德岛罗德岛
        </div>  
        <div class="cart-list-item" @click="cartItemClick">
          <div>
            <van-card price="2.00" title="啊还是福建烤老鼠的划分开卷还是的空间返回空" desc="描述信息描述信息描述信息描述信息描述信息描述信息描述信息" thumb="https://img01.yzcdn.cn/vant/ipad.jpeg" >
              <template #footer>
                <div class="good-number">×{{number}}</div>
              </template>
            </van-card>
          </div>
        </div>
      </scroll>
    </div>

  </div>
</template>


<script>
  import NavBar from "components/common/navBar/NavBar";

  import Scroll from 'components/common/scroll/Scroll'

  import { SubmitBar, Card, Checkbox, Button, Dialog, CheckboxGroup, Cell, CellGroup, Toast } from 'vant';

  export default {
    name: 'Order',
    components: {
      NavBar,
      Scroll,
      [SubmitBar.name]: SubmitBar,
      [Toast.name]: Toast,
      [Card.name]: Card,
      [Checkbox.name]: Checkbox,
      [Button.name]: Button,
      [Dialog.name]: Dialog,
    },
    data () {
      return {
        number: 2
      };
    },
    created() {
      // let loginPhone = this.$store.getters.getUserPhone
      // if (!loginPhone) {
      //   this.$router.replace('/login')
      // }
    },
    methods: {
      backClick() {
        this.$router.go(-1)
      },
      cartItemClick() {
        console.log('aaa')
      },
    },
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }

  .cart-list {
    height: calc(100% - 44px - 49px - 44px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }

  .cart-list-item {
    width: 100%;
    /* display: flex; */
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .address {
    margin: 0 auto;
    margin-top: 10px;
    width: 90%;
    font-size: 14px;
  }

  .van-card {
    background-color: white;
  }

  .van-card__title {
    width: 200px;
  }

  .van-card__desc {
    width: 200px;
    color: #A9A9A9;
    text-overflow : ellipsis;
    white-space: nowrap;
  }

  .van-card__footer {
    display: flex;
    justify-content: flex-end;
  }

  .good-number {
    width: 40px;
    height: 20px;
    font-size: 20px;
    border-radius: 20px;
    text-align: center;
  }
</style>