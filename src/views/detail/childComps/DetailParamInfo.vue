<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <table class="info-size" >
      <tr>
        <td>尺码</td>
        <td v-for="(td, indez) in paramInfo.sizes.size" :key="indez">{{td}}</td>
      </tr>
      <tr>
        <td>胸围</td>
        <td v-for="(td, indez) in paramInfo.sizes.bust" :key="indez">{{td}}</td>
      </tr>
      <tr>
        <td>腰围</td>
        <td v-for="(td, indez) in paramInfo.sizes.waist" :key="indez">{{td}}</td>
      </tr>
      <tr>
        <td>裤长</td>
        <td v-for="(td, indez) in paramInfo.sizes.pants" :key="indez">{{td}}</td>
      </tr>
      <tr>
        <td>肩宽</td>
        <td v-for="(td, indez) in paramInfo.sizes.shoulder" :key="indez">{{td}}</td>
      </tr>
      <tr>
        <td>衣长</td>
        <td v-for="(td, indez) in paramInfo.sizes.garment" :key="indez">{{td}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr>
        <td class="info-param-key">厚薄</td>
        <td class="param-value">{{paramInfo.info.thickness}}</td>
      </tr>
      <tr>
        <td class="info-param-key">厂名</td>
        <td class="param-value">{{paramInfo.info.factory}}</td>
      </tr>
      <tr>
        <td class="info-param-key">颜色</td>
        <td class="param-value">{{paramInfo.info.color}}</td>
      </tr>
      <tr>
        <td class="info-param-key">季节</td>
        <td class="param-value">{{paramInfo.info.season}}</td>
      </tr>
      <tr>
        <td class="info-param-key">厂址</td>
        <td class="param-value">{{paramInfo.info.address}}</td>
      </tr>
      <tr>
        <td class="info-param-key">材质</td>
        <td class="param-value">{{paramInfo.info.material}}</td>
      </tr>
      <tr>
        <td class="info-param-key">领型</td>
        <td class="param-value">{{paramInfo.info.collar}}</td>
      </tr>
      <tr>
        <td class="info-param-key">袖长</td>
        <td class="param-value">{{paramInfo.info.sleeve}}</td>
      </tr>
      <tr>
        <td class="info-param-key">风格</td>
        <td class="param-value">{{paramInfo.info.style}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
	export default {
		name: "DetailParamInfo",
    props: {
		  paramInfo: {
		    type: Object,
        default() {
		      return {}
        }
      }
    }
	}
</script>

<style scoped>
  .param-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }

  .param-info table {
    width: 100%;
    border-collapse: collapse;
  }

  .param-info table tr {
    height: 42px;
  }

  .param-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }

  .info-param {
    border-top: 1px solid rgba(0,0,0,.1);
  }

  .param-value {
    color: #eb4868
  }

  .info-img img {
    width: 100%;
  }
</style>
