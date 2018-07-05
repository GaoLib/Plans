import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'


Vue.use(Vuex)

//声明state
const state = {
	editStatus : 'false'
}

//注册相应模块
const store = new Vuex.Store({
	state,       //共享的状态或数据
	getters,     //获取数据并渲染
	actions,     //数据的异步操作
    mutations    //处理数据的唯一途径
})

export default store