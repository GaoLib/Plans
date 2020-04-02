import Vue from 'vue'
import VueRouter from 'vue-router'
import { constantRouterMap } from './router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
	base: process.env.BASE_URL,
	routes: constantRouterMap
})
	

// const createRouter = () => new VueRouter({
// 	scrollBehavior: () => {
// 		return { x: 0, y: 0 }
// 	},
// 	routes: constantRouterMap
//   })

// const router: any = createRouter()

// export function resetRouter() {
// 	const newRouter: any = createRouter()
// 	router.matcher =  newRouter.matcher
// }
export default router
