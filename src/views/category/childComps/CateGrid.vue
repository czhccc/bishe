<template>
  <div class='CateGrid'>
    
    <van-grid class="van-grid" :icon-size="50" center v-if="subcategories">
      <div class="item" v-for="(item, index) in subcategories" :key="index">
        <a>
          <van-grid-item class="van-grid-item" :icon="item.http" :text="item.name" />
        </a>
      </div>
    </van-grid>

  </div>
</template>

<script>
  import { Grid, GridItem } from 'vant';

  export default {
    name: 'CateGrid',
    components: {
      [Grid.name]: Grid,
      [GridItem.name]: GridItem
    },
    props: {
      subcategories: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .van-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .van-grid-item {
    width: 66px;
    text-overflow: ellipsis;
  }
</style>