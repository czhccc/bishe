<template>
  <div class="category">

    <nav-bar class="category-nav-bar"><template v-slot:center>商品分类</template></nav-bar>
    <div class="content">
      <Scroll>
        <CateMenu :categories="categories" @selectItem="selectItem" />
      </Scroll>

      <Scroll class="scroll" ref="scroll">
        <CateGrid :subcategories="categoriesTypes" />
        <TabControl :tabControl="['流行', '新品', '销量']" @tabClick="tabClick" />
        <CateGoodsList :goodsList="categoriesGoods" />
      </Scroll>
    </div>

  </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import CateMenu from './childComps/CateMenu'
  import CateGrid from './childComps/CateGrid'
  import TabControl from 'components/content/tabControl/TabControl'
  import CateGoodsList from './childComps/CateGoodsList'

  import { toGetCategoryType, toGetCategoryTypeGoods } from "network/category";

  import {debounce} from "common/utils";

  export default {
    name: "Category",
    components: {
      NavBar,
      CateMenu,
      Scroll,
      CateGrid,
      TabControl,
      CateGoodsList
    },
    data() {
      return {
        categories: [], // Menu的文字
        categoriesTypes: [],
        categoriesGoods: [],
        currentIndex: 0, // Menu的当前下标
        currentType: '', // 当前tabControl的种类
      }
    },
    created() {
      this.init()
    },
    mounted() {
      /* 图片加载完成后 better-scroll 刷新内容高度 */
      // 使用防抖函数防止图片加载后的刷新过于频繁
      // 监听item中图片的加载完成 采用事件总线的方式，由 GoodsListItem组件 emit 事件，在这里进行接收
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      this.$bus.$on('detailItemImageLoad', () => {
        refresh()
      })
    },
    methods: {
      init() {
        toGetCategoryType({
          id: 0
        }).then(res => {
          console.log(res)
          this.categories = res.data.result
          toGetCategoryType({
            id: 1
          }).then(res => {
            console.log(res)
            this.categoriesTypes = res.data.result
            toGetCategoryTypeGoods({
              typeId: '1',
              cut: 'pop'
            }).then(res => {
              console.log(res)
              this.categoriesGoods = res.data.result
            })
          })
        })
      },
      selectItem(index) {
        this.currentIndex = index
        toGetCategoryType({
          id: this.categories[this.currentIndex].id
        }).then(res => {
          console.log(res)
          this.categoriesTypes = res.data.result
          toGetCategoryTypeGoods({
            typeId: this.categories[this.currentIndex].id,
            cut: this.currentType
          }).then(res => {
            console.log(res)
            this.categoriesGoods = res.data.result
          })
        })
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
        toGetCategoryTypeGoods({
          typeId: this.categories[this.currentIndex].id,
          cut: this.currentType
        }).then(res => {
          console.log(res)
          this.categoriesGoods = res.data.result
        })
      },
    },
  }
</script>

<style scoped>
  .category {
    margin-top: 44px;
  }

  .category-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
    font-weight: 700;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }

  .scroll {
    height: 100%;
    flex: 1;
  }
</style>