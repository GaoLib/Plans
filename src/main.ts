import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Icon from 'vue-svg-icon/Icon.vue'
import * as directives from '@/directives'
import { DirectiveOptions } from 'vue'

Vue.config.productionTip = false
Vue.component('Icon', Icon)


// 注册全局指令
Object.keys(directives).forEach(key => {
    Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key])
})

async function main_init() {
    try {
        let permission = (await import("@/utils/permission")).permission
        await permission();
        return "success"
    } catch (error) {
        throw new Error(error)
    }
}

main_init().then(() => {
	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app')
})

