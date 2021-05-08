<template>
  <div class="detail">
    <!-- 顶部导航栏 -->
    <detail-nav-bar class="detail-nav-bar" ref="navBar" @titleClick="titleClick"/>

    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <!-- 轮播图 -->
      <detail-swiper ref="swiper" :swiperImages="swiperImages"/>
      <!-- 商品基础信息 -->
      <detail-base-info :goods="goods"/>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"/>
      <!-- 商品详情信息 -->
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <!-- 商品参数信息 -->
      <detail-param-info ref="param" :paramInfo="paramInfo"/>
      <!-- 用户评价信息 -->
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <!-- 推荐商品 -->
      <goods-list ref="recommend" :goodsDate="recommends"/>
    </scroll>

    <!-- 回到顶部按钮 -->
    <back-top class="back-top" @click.native="backTop" v-show="isShowBackTop" />

    <!-- 购物车栏 -->
    <detail-bottom-bar :iid="iid" :isCollected="isCollected" @addCart="addGoodsToCart" @buy="buy" />

    <van-popup v-model="addCartPopupShow" position="bottom" :style="{ height: '80%' }" v-if="swiperImages[0]" @close="addCartPopupClose" >
      <div class="popup-content">
        <div>
          <van-card :price="goods.newPrice" :title="goods.title" :desc="goods.title" :thumb="swiperImages[0].http" ></van-card>
        </div>
        <div class="amount">
          <div class="amount-title">购买数量：</div>
          <div class="amount-content">
            <van-stepper class="stepper" theme="round" v-model="goodNumber" />
            <div class="goodAmount">￥{{totalGoodPrice}}</div>
          </div>
        </div>
        <van-button class="popup-btn" round type="info" @click="addCartConfirm">加入购物车</van-button>
      </div>
    </van-popup>

    <van-popup v-model="buyPopupShow" position="bottom" :style="{ height: '80%' }" v-if="swiperImages[0]" @close="buyPopupClose" >
      <div class="popup-content">
        <div>
          <van-card :price="goods.newPrice" :title="goods.title" :desc="goods.title" :thumb="swiperImages[0].http" ></van-card>
        </div>
        
        <div class="items">
          <div class="address">
            <div class="address-title">收货人：</div>
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

          <div class="amount">
            <div class="amount-title">购买数量：</div>
            <div class="amount-content">
              <van-stepper class="stepper" theme="round" v-model="goodNumber" />
              <div class="goodAmount">￥{{totalGoodPrice}}</div>
            </div>
          </div>
        </div>
        
        </div>
        <van-button class="popup-btn" round type="info" @click="buyConfirm">立即购买</van-button>
      </div>
    </van-popup>

  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "components/content/goodsList/GoodsList";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";

  import { toGetGoodsList } from "network/home";
  import { toGetGoodsDetails } from "network/detail";
  import { toAddIntoCart, toBuyRightNow } from "network/cart";
  import { toCheckCollectionStatus } from 'network/collection.js'
  import { toGetAddressList } from 'network/address.js'

  import { debounce } from "common/utils";

  import { backTopMixin } from 'common/mixin'

  import { Toast, Popup, Card, Stepper, Button, Icon } from 'vant';

  import * as types from '../../store/mutation-types'

  export default {
    name: "Detail",
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      [Button.name]: Button,
      [Toast.name]: Toast,
      [Popup.name]: Popup,
      [Card.name]: Card,
      [Stepper.name]: Stepper,
      [Icon.name]: Icon,
    },
    mixins: [backTopMixin], // 回到顶部按钮
    data() {
      return {
        iid: null, // 从主页跳转所携带的信息
        swiperImages: [], // 轮播图的图片
        goods: {}, // 商品信息
        shop: {}, // 店铺信息
        detailInfo: {}, // 商品的详情信息
        paramInfo: {}, // 参数的信息
        commentInfo: {}, // 评论的信息
        recommends: [], // 推荐商品的信息
        goodNumber: 1,

        isCollected: false,

        buyPopupShow: false,
        addCartPopupShow: false,
        defaultAddress: {},
        choose_address: {},

        themeTopYs: [], // 每一个模块对应的Y值
        getThemeTopYs: null, // 防抖的对应模块跳转函数
        currentIndex: 0, // 记录当前的模块的index
      }
    },
    computed: {
      totalGoodPrice() {
        return this.goodNumber * this.goods.newPrice
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
    watch: {
      '$route' (to, from) {
        console.log(from)
        console.log(to.path)
        if(to.path == "/address") {
          return ;
        }
        console.log(to.path.charAt(to.path.length-1))
        toGetGoodsDetails({
          id: to.path.charAt(to.path.length-1)
        }).then(res => {
          console.log(res)
          if (res.data.result) {
            let data = res.data.result
            this.swiperImages = data.images || []
            this.goods = {
              title: data.title,
              newPrice: `${data.amount}`,
              oldPrice: `${data.amount+50}`,
              discount: '限时特价',
              sales: data.sales,
              collection: data.collection,
              service: '72小时内发货',
            }
            this.shop = data.shop
            this.detailInfo = {
              desc: data.title,
              detailImage: data.images
            },
            this.paramInfo = {
              sizes: data.forms,
              info: data.data
            },
            this.commentInfo = data.evaluations[0]
          }
        })
        this.$forceUpdate()
        this.$refs.scroll.scrollTo(0, 0, 200)
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log(from)
      if(from.path == "/address") {
        console.log('789')
        next(vm => {
          console.log('456')
          console.log(vm)
          vm.buyPopupShow = true
          vm.choose_address = vm.$store.getters.getChooseAddress
          console.log('this.choose_address', vm.choose_address)
        })
      }
      next()
    },
    created() {
      this.getGoodsData()
      this.getRecommendGoodsData()
      this._getOffsetTops()
      toCheckCollectionStatus({
        phone: '13989536936',
        comId: this.iid
      }).then(res => {
        this.isCollected = res.data.isCol
      })
      toGetAddressList({
        phone: '13989536936',
        status: '1'
      }).then(res => {
        if(res.data.code=='200') {
          this.defaultAddress = res.data.result[0]
        } else {
          Toast('出错了')
        }
      })
    },
    mounted() {
      this._refresh() // 图片加载完成后 better-scroll 刷新内容高度
    },
    methods: {
      getGoodsData() { // 获取数据
        // 保存传入的iid
        this.iid = this.$route.params.iid
        // 根据 iid 请求商品数据
        toGetGoodsDetails({
          id: this.iid
        }).then(res => {
          let data = res.data.result
          this.swiperImages = data.images
          this.goods = {
            title: data.title,
            newPrice: `${data.amount}`,
            oldPrice: `${data.amount+50}`,
            discount: '限时特价',
            sales: data.sales,
            collection: data.collection,
            service: '72小时内发货',
          }
          this.shop = data.shop
          this.detailInfo = {
            desc: data.title,
            detailImage: data.images
          },
          this.paramInfo = {
            sizes: data.forms,
            info: data.data
          },
          this.commentInfo = data.evaluations[0]
        })
      },
      getRecommendGoodsData() {
        toGetGoodsList({
          comId: this.iid
        }).then(res => {
          this.recommends = res.data.result
        })
      },
      _getOffsetTops() { // 获取总的offsetTop，用于顶部导航栏的跳转
        this.getThemeTopYs = debounce(() => {
          // .content { height: calc(100% - 44px); } // calc属性会影响到顶部导航栏的跳转，这里需要 -44 px
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.param.$el.offsetTop-44)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
        }, 60)
      },
      _refresh() { // 图片加载完成后 better-scroll 刷新内容高度
        // 使用防抖函数防止图片加载后的刷新过于频繁
        const refresh = debounce(this.$refs.scroll.refresh, 50)
        // 监听item中图片的加载完成 采用事件总线的方式，由 GoodsListItem组件 emit 事件，在这里进行接收
        this.$bus.$on('detailItemImageLoad', () => {
          refresh()
        })
      },
      imageLoad() { // 监听图片加载完成
        this.$refs.scroll.refresh() // 图片加载完成后刷新better-scroll
        this.getThemeTopYs() // 图片加载完成后获取总的offsetTop，用于顶部导航栏的跳转
      },
      titleClick(index) { // 根据navbar的按钮跳转到相应的位置
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position) { // 监听滚动
        // 获取 Y 值
        const positionY = -position.y
        let length = this.themeTopYs.length;
        for (let i = 0; i < length; i++) {
          if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i===length-1 && positionY>=this.themeTopYs[i]))) {
            this.currentIndex = i;
            this.$refs.navBar.currentIndex = this.currentIndex
          }
        }
        this.showBackTop(position) // 是否显示 backTop 按钮
      },
      addGoodsToCart() { // 接收ButtomBar加入购物车按钮发出的事件，将商品添加到购物车
        this.addCartPopupShow = true
      },
      buy() {
        console.log('aaa')
        this.buyPopupShow = true
      },
      chooseOtherAddress() {
        this.$router.push('/address')
      },
      addCartConfirm() {
        toAddIntoCart({
          phone: '13989536936',
          comId: this.iid,
          num: this.goodNumber
        }).then(res => {
          console.log(res)
          if (res.data.code == '403') {
            this.$router.push('/login')
          } else if (res.data.code == '200') {
            Toast('已成功加入购物车');
          } else {
            Toast('加入购物车失败');
          }
        })
      },
      buyConfirm() {
        toBuyRightNow({
          phone: '13989536936',
          comId: this.iid,
          num: this.goodNumber,
          amount: this.totalGoodPrice,
          address: this.choose_address.id || this.defaultAddress.id
        }).then(res => {
          console.log(res)
          if(res.data.code=='200') {
            Toast('购买成功');
          } else {
            Toast('购买失败');
          }
        }) 
      },
      addCartPopupClose() {
        this.goodNumber = 1
      },
      buyPopupClose() {
        this.goodNumber = 1
        this.$store.commit(types.CHOOSE_ADDRESS, {})
      },
    }
  }
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
    padding-bottom: 60px;
  }

  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }

  .back-top {
    margin-bottom: 15px;
  }

  .popup-content {
    height: 100%;
  }

  .items {
    padding: 10px;
  }

  .amount {
    margin-top: 10px;
  }

  .amount-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .stepper {
    margin-left: 10px;
    margin-top: 5px;
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

</style>