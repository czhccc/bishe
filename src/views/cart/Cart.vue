<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <template v-slot:center>购物车({{goodsNumber || 0}})</template>
    </nav-bar>

    <div class="cart-list">
      <scroll class="content" ref="scroll">
        <!-- <div class="cart-list-item" v-for="(item, index) in goodsList" :key="index"> -->
        <div class="cart-list-item">
          <van-checkbox v-model="aaa">复选框</van-checkbox>
          <div>
            <van-card price="2.00" title="啊还是福建烤老鼠的划分开卷还是的空间返回空" desc="描述信息描述信息描述信息描述信息描述信息描述信息描述信息" thumb="https://img01.yzcdn.cn/vant/ipad.jpeg" >
              <template #footer>
                <div class="good-number">
                  <van-button class="number-button" size="mini" @click="subClick">-</van-button>
                  <div class="number">{{number}}</div>
                  <van-button class="number-button" size="mini" @click="addClick">+</van-button>
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
                      :price="3050"
                      button-text="提交订单" 
                      @submit="onSubmit">
        <van-checkbox v-model="isAllChecked">全选</van-checkbox>
      </van-submit-bar>
    </div>

  </div>
</template>

<script>
  import NavBar from "components/common/navBar/NavBar";

  import Scroll from 'components/common/scroll/Scroll'

  import { SubmitBar, Card, Checkbox, Button, Dialog, CheckboxGroup, Cell, CellGroup, Toast } from 'vant';

  import { toSelectCart, toAddCartNumber, toSubCartNumber, toRemoveCartGood } from '../../network/cart'

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
    },
    data() {
      return {
        userPhone: '',
        goodsNumber: 0,
        goodsList: [],
        isAllChecked: false,
        theTotalPrice: 0,
        isLoading: false,
        aaa: false,
        number: 2,
      }
    },
    created() {
      this.userPhone = this.$store.getters.getUserPhone
      // if (!this.userPhone) {
      //   this.$router.replace('/login')
      // }
    },
    computed: {
      // 计算总价格
      totalPrice() { 
        
      },
      // 是否全部选中
      isSelectAll() { 
        
      },
      // 判断是否禁用 提交订单 按钮
      isDisabled() {
        
      }
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
            this.goodsList = res.data.result
          }
        })
      },
      checkClick() {
        this.goodsList.checked = !this.goodsData.checked
      },
      // 点击 购买订单 按钮
      onSubmit() {
        
      },
      checkAllClick() {
        
      },
      checkBtnClick() {
        this.aaa = !this.aaa
      },
      subClick() {
        if(this.number == 1) {
          Dialog.confirm({
            title: '确认删除商品？',
          }).then(() => {
            // on confirm
            toRemoveCartGood({
              phone: '13989536936',
              // id: 
            }).then(res => {
              console.log(res)
            })
          }).catch(() => {
              // on cancel
          });
        } else {
          this.number--
        }
      },
      addClick() {
        this.number++
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
</style>