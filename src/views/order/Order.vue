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
        <div v-for="(item, index) in list" :key="index">
          <div class="address">
            <div class="address-icon"><van-icon name="location-o" /></div>
            <div class="address-content">
              {{item.name}} {{item.phone}}<br>
              {{item.address}}
            </div>
          </div>  
          <div class="cart-list-item" >
            <div>
              <van-card price="2.00" :title="item.title" :desc="item.title" :thumb="item.http" >
                <template #footer>
                  <div class="good-number">×{{item.num}}</div>
                </template>
              </van-card>
            </div>
          </div>
        </div>

      </scroll>
    </div>

  </div>
</template>


<script>
  import NavBar from "components/common/navBar/NavBar";

  import Scroll from 'components/common/scroll/Scroll'

  import { Icon, SubmitBar, Card, Checkbox, Button, Dialog, CheckboxGroup, Cell, CellGroup, Toast } from 'vant';

  import { toGetOrderList } from '../../network/order'

  export default {
    name: 'Order',
    components: {
      NavBar,
      Scroll,
      [Icon.name]: Icon,
      [SubmitBar.name]: SubmitBar,
      [Toast.name]: Toast,
      [Card.name]: Card,
      [Checkbox.name]: Checkbox,
      [Button.name]: Button,
      [Dialog.name]: Dialog,
    },
    data () {
      return {
        list: [],
        number: 2
      };
    },
    created() {
      
    },
    activated() {
      let loginPhone = this.$store.getters.getUserPhone
      if (!loginPhone) {
        this.$router.push('/login')
      }
      toGetOrderList({
        phone: this.$store.getters.getUserPhone
      }).then(res => {
        console.log(res)
        if(res.data.code == '403') {
          this.$router.push('/login')
        } else if (res.data.code == '200') {
          this.list = res.data.result
        }
      })
    },
    methods: {
      backClick() {
        this.$router.go(-1)
      },
    },
  }
</script>

<style scoped>
  .order {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }

  .cart-list {
    height: calc(100% - 44px - 50px);
    padding-top: 10px;
  }

  .content {
    height: 100%;
    overflow: hidden;
  }

  .cart-list-item {
    width: 100%;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .address {
    margin: 0 auto;
    margin-top: 10px;
    width: 90%;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  
  .address-content {
    margin-left: 10px;
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