<template>
  <div id="main-tab-bar">
    
    <van-tabbar route v-model="active" active-color="yellowgreen" inactive-color="#000">
      <van-tabbar-item replace to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/category" icon="apps-o">分类</van-tabbar-item>
      <!-- <van-tabbar-item replace to="/cart" icon="cart-o" :badge="cartCount">购物车</van-tabbar-item> -->
      <van-tabbar-item replace to="/cart" icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/profile" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vant';
  
  export default {
    name: "MainTabBar",
    components: {
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem
    },
    data() {
      return {
        active: 0,
      }
    },
    computed: {
      // cartCount() { // 用于显示购物车的商品数量
		  //   return 
      // }
    },
  }
</script>

<style scoped>

</style> 