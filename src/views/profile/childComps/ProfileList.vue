<template>
    <div id="list">
      <div v-for="(item, index) in listData" :key="index" class="item" @click="navigate(item.routePath)">
        <span class="icon">
          <van-icon :name="item.icon" color="yellowgreen" />
        </span>
        <div class="info">{{item.info}}</div>
      </div>
    </div>
</template>

<script>
  import { Icon } from 'vant';

	export default {
		name: "ListView",
    components: {
      [Icon.name]: Icon,
    },
    props: {
		  listData: {
		    type: Array,
        default: function () {
          return []
        }
      }
    },
    methods: {
      navigate(path) {
        if(path) {
          this.$router.push(path)
        } else {
          location.reload()
        }
      }
    }
	}
</script>

<style scoped>
  #list {
    background-color: #fff;
    font-size: 15px;
    color: #333;
    border-top: thick solid rgb(236, 236, 236);
    border-width: 12px;
  }

  #list .item {
    height: 44px;
    line-height: 44px;
    position: relative;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
  }

  .item .icon {
    margin-top: 10px;
    position: absolute;
    left: 16px;
    top: -7px;
  }

  .item .info {
    margin-left: 40px;
    padding-left: 5px;
  }

  .item:last-of-type .info {
    border-bottom: none;
  }
</style>
