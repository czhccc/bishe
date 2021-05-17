<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <template v-slot:center>购物车({{goodsNumber || 0}})</template>
    </nav-bar>

    <div class="address" v-if="defaultAddress">
      <div class="address-content" @click="chooseOtherAddress">
        <div class="address-icon"><van-icon name="location-o" /></div>
        <div class="address-main">
          <div class="address-name">
            {{choose_address.name || defaultAddress.name}} {{choose_address.phone || defaultAddress.phone}}
            <div class="defaultIcon" v-if="isShowDefaultIcon">默认</div>
          </div>
          <div class="address-address">{{choose_address.address || defaultAddress.address}}</div>
        </div>
        <div class="address-icon"><van-icon name="arrow" /></div>
      </div>
    </div>

    <div class="cart-list">
      <scroll class="content" ref="scroll">
        <div class="cart-list-item" v-for="(item, index) in list" :key="index">
          <van-checkbox v-model="item.check">复选框</van-checkbox>
          <div class="cart-list-item-content">
            <van-card :price="item.goodData.amount" :title="item.goodData.title" :desc="item.goodData.title" :thumb="item.goodData.images[0].http" >
              <template #footer>
                  <van-stepper class="stepper" 
                               theme="round" 
                               v-model="item.goodData.num" 
                               disable-input
                               :min="0"
                               @plus="addClick(item.goodData)" 
                               @minus="subClick(item.goodData)" />
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

  </div>
</template>

<script>
  import NavBar from "components/common/navBar/NavBar";

  import Scroll from 'components/common/scroll/Scroll'

  import { SubmitBar, Card, Checkbox, Button, Dialog, Popup, Toast, Icon, Stepper } from 'vant';

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
      [Icon.name]: Icon,
      [Stepper.name]: Stepper,
    },
    data() {
      return {
        userPhone: '',
        goodsNumber: 0,
        list: [],
        isLoading: false,
        choose_address: {},
        defaultAddress: {},
      }
    },
    created() {
      
    },
    activated () {
      console.log('cart actived')
      let loginPhone = this.$store.getters.getUserPhone
      console.log(loginPhone)
      if (!loginPhone) {
        this.$router.push('/login')
      }
      toGetAddressList({
        phone: this.$store.getters.getUserPhone,
        status: '1'
      }).then(res => {
        console.log(res)
        if (res.data.code == '403') {
          // this.$router.push('/login')
        } else if(res.data.result) {
          this.defaultAddress = res.data.result[0]
        }
      })

      this.selectCart()
      this.$refs.scroll.refresh() // 进入时重新刷新better-scroll，否则bette-scroll不知道添加了新数据
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
      isSelectAll: { 
        get() {
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
      if(from.path == "/address") {
        next(vm => {
          vm.choose_address = vm.$store.getters.getChooseAddress
        })
      }
      next()
    },
    methods: {
      selectCart() {
        toSelectCart({
          phone: this.$store.getters.getUserPhone
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
      onSubmit() {
        this.isLoading = true
        let tempId = ''
        for (const i of this.list) {
          if(i.check == true) {
            if(tempId == '') {
              tempId = i.goodData.id
            } else {
              tempId = tempId + `,${i.goodData.id}`
            }
          }
        }
        toBuy({
          phone: this.$store.getters.getUserPhone,
          id: tempId,
          amount: 0,
          address: this.choose_address.id || this.defaultAddress.id,
        }).then(res => {
          console.log(res)
          if(res.data.code == '200') {
            Toast('购买成功')
            this.isLoading = false
            this.goodNumber = 1
            this.selectCart()
          }
        })
      },
      subClick(item) {
        if(item.num <= 1) {
          Dialog.confirm({
            title: '确认删除商品？',
          }).then(() => {
            toRemoveCartGood({
              phone: this.$store.getters.getUserPhone,
              id: item.id
            }).then(res => {
              if(res.data.code == '200') {
                Toast('删除成功')
                this.selectCart()
              } else {
                Toast('失败')
              }
            })
          }).catch(err => {
            this.selectCart()
            console.log(err)
          })
        } else {
          toSubCartNumber({
            phone: this.$store.getters.getUserPhone,
            id: item.id
          }).then(res => {
            if(res.data.code == '200') {
              this.selectCart()
            } else {
              Toast('失败')
            }
          })
        }
      },
      addClick(item) {
        toAddCartNumber({
          phone: this.$store.getters.getUserPhone,
          id: item.id
        }).then(res => {
          if(res.data.code == '200') {
            this.selectCart()
          } else {
            Toast('失败')
          }
        })
      },
      chooseOtherAddress() {
        this.$router.push('/address')
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
    height: calc(100% - 44px - 42px - 100px);
    
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

  .cart-list-item-content {
    width: 100%;
  }

  .van-checkbox {
    margin-left: 10px;
  }

  .van-card {
    background-color: white;
  }

  .good-number {
    width: 110px;
    background-color: rgb(246,247,247);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .address {
    border-bottom: 1px solid black;
  }

  .address-content {
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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

  .address-main {
    text-align: left;
    width: 85%;
  }

  .address-address {
    width: 100%;
    color: black;
    font-size: 14px;
    word-break: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .stepper {
    position: absolute;
    bottom: 0px;
    right: 10px;
  }
</style>