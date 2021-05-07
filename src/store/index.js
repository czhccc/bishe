import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

// 安装
Vue.use(Vuex)

// 创建state对象
const state = {
  cartList: [],
  user_phone: "",
  user_amount: 0,
  choose_address: {},
}

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

// 导出
export default store
