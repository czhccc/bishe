<template>
  <div class="collection">

    <nav-bar>
      <template v-slot:left>
        <img class="back" src="~assets/img/common/back.svg" @click="backClick" alt="">
      </template>
      <template v-slot:center>
        <div class="title">我的收藏</div>
      </template>
    </nav-bar>

    <div class="cart-list">
      <scroll class="content" ref="scroll">
        <div class="cart-list-item" @click="listItemClick(item.com_id)" v-for="(item, index) in list" :key='index'>
          <div>
            <van-card :price="item.amount" :title="item.title" :desc="item.title" :thumb="item.http" >
            </van-card>
          </div>
        </div>
      </scroll>
    </div>

  </div>
</template>


<script>
  import { toGetCollectionList } from '../../network/collection'

  import NavBar from "components/common/navBar/NavBar";

  import Scroll from 'components/common/scroll/Scroll'

  import { Card, Button, Dialog, Toast } from 'vant';

  export default {
    name: 'Collection',
    components: {
      NavBar,
      Scroll,
      [Toast.name]: Toast,
      [Card.name]: Card,
      [Button.name]: Button,
      [Dialog.name]: Dialog,
    },
    data () {
      return {
        list: [],
      };
    },
    created() {
      // let loginPhone = this.$store.getters.getUserPhone
      // if (!loginPhone) {
      //   this.$router.replace('/login')
      // }
    },
    activated() {
      let loginPhone = this.$store.getters.getUserPhone
      if (!loginPhone) {
        this.$router.push('/login')
      }
      this.getCollectionList()
    },
    methods: {
      getCollectionList() {
        toGetCollectionList({
          phone: this.$store.getters.getUserPhone
        }).then(res => {
          console.log(res)
          this.list = res.data.result
        })
      },
      backClick() {
        this.$router.go(-1)
      },
      listItemClick(goodId) {
        this.$router.push('/detail/' + goodId)
      }
    },
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
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
</style>