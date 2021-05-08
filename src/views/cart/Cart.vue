<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <template v-slot:center>购物车({{goodsNumber || 0}})</template>
    </nav-bar>

    <div class="cart-list">
      <scroll class="content" ref="scroll">
        <div class="cart-list-item" v-for="(item, index) in list" :key="index">
          <van-checkbox v-model="item.check">复选框</van-checkbox>
          <div>
            <van-card :price="item.goodData.amount" :title="item.goodData.title" :desc="item.goodData.title" :thumb="item.goodData.images[0].http" >
              <template #footer>
                <div class="good-number">
                  <van-button class="number-button" size="mini" @click="subClick(item.goodData)">-</van-button>
                  <div class="number">{{item.goodData.num}}</div>
                  <van-button class="number-button" size="mini" @click="addClick(item.goodData)">+</van-button>
                </div>
              </template>
            </van-card>
          </div>
        </div>
      </scroll>
    </div>

    <div class="bottom-bar">
      <van-submit-bar class="van-submit-bar"
                      :loading="isLoading ? true : false"
                      :disabled="isDisabled ? true : false"
                      :price="totalPrice*100"
                      button-text="提交订单" 
                      @submit="onSubmit">
        <van-checkbox v-model="isSelectAll">全选</van-checkbox>
      </van-submit-bar>
    </div>

    <van-popup v-model="buyPopupShow" position="bottom" :style="{ height: '50%' }" @close="buyPopupClose">
      <div class="popup-content">
        <div class="address">
          <div class="address-title">
            选择收货人：
            <van-button class="" round size="mini" type="info" @click="chooseOtherAddress">选择其他地址</van-button>
          </div>
          <div class="address-content">
            <div class="address-name">
              {{choose_address.name || defaultAddress.name}} {{choose_address.phone || defaultAddress.phone}}
              <div class="defaultIcon" v-if="isShowDefaultIcon">默认</div>
            </div>
            <div class="address-address">{{choose_address.address || defaultAddress.address}}</div>
          </div>
        </div>
        <van-button class="popup-btn" round type="info" @click="buyConfirm">提交订单</van-button>
      </div>
    </van-popup>

  </div>
</template>

<script>
  import NavBar from "components/common/navBar/NavBar";

  import Scroll from 'components/common/scroll/Scroll'

  import { SubmitBar, Card, Checkbox, Button, Dialog, Popup, CheckboxGroup, Cell, CellGroup, Toast } from 'vant';

  import { toSelectCart, toAddCartNumber, toSubCartNumber, toRemoveCartGood, toBuy } from '../../network/cart'
  import { toGetAddressList } from 'network/address.js'

  import * as types from '../../store/mutation-types'

  export default {
    name: "Cart",
    components: {
      NavBar,
      Scroll,
      [SubmitBar.name]: SubmitBar,
      [Toast.name]: Toast,
      [Card.name]: Card,
      [Checkbox.name]: Checkbox,
      [Button.name]: Button,
      [Dialog.name]: Dialog,
      [Popup.name]: Popup,
    },
    data() {
      return {
        userPhone: '',
        goodsNumber: 0,
        list: [],
        isLoading: false,
        buyPopupShow: false,
        choose_address: {},
        defaultAddress: {},
      }
    },
    created() {
      this.userPhone = this.$store.getters.getUserPhone
      // if (!this.userPhone) {
      //   this.$router.replace('/login')
      // }
      toGetAddressList({
        phone: '13989536936',
        status: '1'
      }).then(res => {
        console.log(res)
        this.defaultAddress = res.data.result[0]
      })
    },
    computed: {
      // 计算总价格
      totalPrice() { 
        let tempPrice = 0
        for (const i of this.list) {
          if(i.check == true) {
            tempPrice = tempPrice + i.goodData.num * i.goodData.amount
          }
        }
        return tempPrice
      },
      // 是否全部选中
      isSelectAll: { 
        get() {
          // for (const i of this.list) {
          //   if(i.check == false) {
          //     return false
          //   }
          // }
          // return true
          if(this.list.length === 0) { // 如果购物车中没有商品，则返回 false
            this.isDisable = true
            return false
          }
          return !this.list.find(item => !item.check) // 如果有不被选中的商品，则返回 false
        },
        set(newValue) {
          if(newValue == true) {
            for (const i of this.list) {
              i.check = true
            }
          } else {
            for (const i of this.list) {
              i.check = false
            }
          }
        }
      },
      // 判断是否禁用 提交订单 按钮
      isDisabled() {
        for (const i of this.list) {
          if(i.check == true) {
            return false
          }
        }
        return true
      },
      isShowDefaultIcon() {
        if (this.choose_address.id) {
          if (this.choose_address.isDefault == true) {
            return true
          } else {
            return false
          }
        } else if (this.defaultAddress.status == '1') {
          return true
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log(from)
      if(from.path == "/address") {
        next(vm => {
          console.log(vm)
          vm.buyPopupShow = true
          vm.choose_address = vm.$store.getters.getChooseAddress
          console.log('this.choose_address', vm.choose_address)
        })
      }
      next()
    },
    activated() {
      this.selectCart()
      this.$refs.scroll.refresh() // 进入时重新刷新better-scroll，否则bette-scroll不知道添加了新数据
    },
    methods: {
      selectCart() {
        toSelectCart({
          // phone: this.userPhone
          phone: '13989536936'
        }).then(res => {
          console.log(res)
          if(res.data.result) {
            this.goodsNumber = res.data.result.length || 0
            let tempArr = []
            for (const i of res.data.result) {
              let tempObj = {
                check: false,
                goodData: i
              }
              tempArr.push(tempObj)
            }
            this.list = tempArr
          }
        })
      },
      checkClick() {
        this.goodsList.checked = !this.goodsData.checked
      },
      // 点击 购买订单 按钮
      onSubmit() {
        this.buyPopupShow = true
        // toBuy({
        //   phone: '13989536936'
        //   // id: 
        // }).then(res => {
        //   console.log(res)
        // })
      },
      subClick(item) {
        if(item.num <= 1) {
          Dialog.confirm({
            title: '确认删除商品？',
          }).then(() => {
            toRemoveCartGood({
              phone: '13989536936',
              id: item.id
            }).then(res => {
              console.log(res)
              this.selectCart()
            })
          }).catch(err => {
            console.log(err)
          })
        } else {
          toSubCartNumber({
            phone: '13989536936',
            id: item.id
          }).then(res => {
            this.selectCart()
          })
        }
      },
      addClick(item) {
        toAddCartNumber({
          phone: '13989536936',
          id: item.id
        }).then(res => {
          console.log(res)
          this.selectCart()
        })
      },
      chooseOtherAddress() {
        this.$router.push('/address')
      },
      buyConfirm() {

      },
      buyPopupClose() {
        this.goodNumber = 1
        this.$store.commit(types.CHOOSE_ADDRESS, {})
      },
    }

  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }

  .van-submit-bar {
    margin-bottom: 50px;
  }

  .text {
    margin-top: 4px;
    margin-left: 20px;
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
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .van-checkbox {
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
    width: 110px;
    background-color: rgb(246,247,247);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .number {
    width: 30px;
    font-size: 20px;
    text-align: center;
  }

  .number-button {
    width: 40px;
    margin: 0;
    font-size: 20px;
    border: none;
    background-color: rgb(246,247,247);
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }

  .popup-content {
    height: 100%;
  }

  .stepper {
    text-align: right;
    margin-top: 5px;
    margin-right: 5px;
  }

  .popup-btn {
    width: 90%;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

  .goodAmount {
    text-align: right;
    margin-top: 10px;
    margin-right: 35px;
    color: black;
  }

  .address-content {
    padding: 5px 10px;
  }

  .address-name {
    display: flex;
    align-items: center;
    color: black;
    font-size: 14px;
  }

  .defaultIcon {
    background-color: red;
    display: inline-block;
    width: 30px;
    margin-left: 10px;
    text-align: center;
    border-radius: 20px;
    font-size: 12px;
    color: white;
  }

  .address-address {
    color: black;
    font-size: 14px;
  }
</style>