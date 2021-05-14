<template>
  <div class="bottom-bar">

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" @click="onClickIcon1" text="客服" dot color="#07c160" />
      <van-goods-action-icon icon="shop-o" @click="onClickIcon2" text="店铺" />
      <van-goods-action-icon icon="star" @click="onClickIcon3" text="收藏" :color="isStared ? '#ff5000' : '#A9A9A9'" />
      <van-goods-action-button type="warning" @click="onClickButton1" text="加入购物车" />
      <van-goods-action-button type="danger" @click="onClickButton2" text="立即购买" />
    </van-goods-action>

  </div>
</template>

<script>
  import { toAddCollection, toCancelCollection, toCheckCollectionStatus } from '../../../network/collection'

  import { GoodsAction, GoodsActionIcon, GoodsActionButton, Toast, Sku } from 'vant';
  

	export default {
		name: "DetailBottomBar",
    components: {
      [GoodsAction.name]: GoodsAction,
      [GoodsActionIcon.name]: GoodsActionIcon,
      [GoodsActionButton.name]: GoodsActionButton,
      [Toast.name]: Toast,
      [Sku.name]: Sku,
    },
    props: ['iid', 'isCollected'],
    data() {
      return {
        isStared: false,
      }
    },
    watch: {
      isCollected: {
        immediate: true,
        handler: function(newValue) {
          this.isStared = newValue
        }
      }
    },
    created() {
      this.isStared = this.isCollected
    },
    methods: {
      onClickIcon1() {
        Toast('点击客服图标');
      },
      onClickIcon2() {
        Toast('点击店铺图标');
      },
      onClickIcon3() {
        let userPhone = this.$store.getters.getUserPhone
        console.log(userPhone)
        if (userPhone == '') {
          this.$router.push('/login')
        } else {
          if (this.isStared) {
            toCancelCollection({
              phone: userPhone,
              comId: this.iid
            }).then(res => {
              console.log(res)
              this.isStared = false
              if(res.data.code == '200') {
                Toast('取消收藏成功')
              } else {
                Toast('网络请求失败')
              }
            })
          } else {
            toAddCollection({
              phone: userPhone,
              comId: this.iid
            }).then(res => {
              console.log(res)
              if(res.data.code == '200') {
                this.isStared = true
                Toast('收藏成功')
              } else {
                Toast('网络请求失败')
              }
            })
          }
        }
      },
      onClickButton1() {
        this.$emit('addCart')
      },
      onClickButton2() {
        this.$emit('buy')
      },
    }
	}
</script>

<style scoped>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
</style>
