<template>
  <div class="profile">

    <nav-bar class="profile-nav-bar"><template v-slot:center>我的信息</template></nav-bar>
    <ProfileTop />
    <ProfileList :list-data="orderList" class="order-list" />
    <ProfileList :list-data="serviceList" class="service-list" />
    
  </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'
  import ProfileTop from './childComps/ProfileTop'
  import ProfileList from './childComps/ProfileList'

  import TabControl from "components/content/tabControl/TabControl";

  export default {
    name: "Profile",
    components: {
      NavBar,
      ProfileTop,
      ProfileList,
      TabControl
    },
    data() {
      return {
        orderList: [
          {icon: 'like-o', info: '我的收藏', routePath: '/collection'},
          {icon: 'balance-list-o', info: '我的订单', routePath: '/order'},
          {icon: 'cart-o', info: '我的购物车', routePath: '/cart'},
        ],
        serviceList: [
          {icon: 'location-o', info: '我的收获地址', routePath: '/address'},
          {icon: 'setting-o', info: '修改密码', routePath: '/forgetPassword'},
          {icon: 'replay', info: '退出登录', routePath: ''},
        ],
        
      }
    },
    created() {
      
    },
  }
</script>

<style scoped>
  .profile {
    padding-top: 44px;
    margin-bottom: 50px;
  }

  .profile-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
    font-weight: 700;
  }

  .tab-control {
    position: sticky;
    top: 60px;
  }
</style>