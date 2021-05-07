<template>
  <div class="bottom-bar">

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" @click="onClickIcon1" text="客服" dot color="#07c160" />
      <van-goods-action-icon icon="shop-o" @click="onClickIcon2" text="店铺" />
      <van-goods-action-icon icon="star" @click="onClickIcon3" text="收藏" :color="isStared ? '#ff5000' : '#A9A9A9'" />
      <van-goods-action-button type="warning" @click="onClickButton1" text="加入购物车" />
      <van-goods-action-button type="danger" @click="onClickButton2" text="立即购买" />
    </van-goods-action>

    <!-- <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked" /> -->

    

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
        
        goodsId: '',
        sku: {
          tree: [
            {
              k: '颜色', // skuKeyName：规格类目名称
              k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
              v: [
                {
                  id: '1', // skuValueId：规格值 id
                  name: '红色', // skuValueName：规格值名称
                },
                {
                  id: '1',
                  name: '蓝色',
                }
              ],
              largeImageMode: false, //  是否展示大图模式
            }
          ],
          // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
          list: [
            {
              id: 2259, // skuId
              s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
              s2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
              price: 100, // 价格（单位分）
              stock_num: 110 // 当前 sku 组合对应的库存
            }
          ],
          price: '1.00', // 默认价格（单位元）
          stock_num: 227, // 商品总库存
          collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
          none_sku: false, // 是否无规格商品
          messages: [
            {
              // 商品留言
              datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
              multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
              name: '留言', // 留言名称
              type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
              required: '1', // 是否必填 '1' 表示必填
              placeholder: '' // 可选值，占位文本
            }
          ],
        },
        goods: {
          // 默认商品 sku 缩略图
          picture: 'https://img01.yzcdn.cn/1.jpg'
        },
      }
    },
    watch: {
      isCollected: {
        immediate:true,
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
        // this.isStared = !this.isStared
        if (this.isStared) {
          console.log('取消收藏')
          toCancelCollection({
            phone: '13989536936',
            comId: this.iid
          }).then(res => {
            console.log(res)
            this.isStared = false
          })
        } else {
          console.log('进行收藏')
          toAddCollection({
            phone: '13989536936',
            comId: this.iid
          }).then(res => {
            console.log(res)
            // if(res.data.code == '200') {
              this.isStared = true
            // }
          })
        }
      },
      onClickButton1() {
        this.$emit('addCart')
      },
      onClickButton2() {
        // Toast('点击立即购买按钮');
        this.$emit('buy')
      },
      // onBuyClicked() {

      // },
      // onAddCartClicked() {

      // },
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
