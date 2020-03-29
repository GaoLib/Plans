import Vue from 'vue'
import VueRouter from 'vue-router'
import { constantRouterMap } from './router'

Vue.use(VueRouter)

const createRouter: any = () => new VueRouter({
	scrollBehavior () {
		return { x: 0, y: 0 }
	},
	routes: constantRouterMap
  })

const router = createRouter()

export function resetRouter() {
	const newRouter = createRouter()
	router.matcher =  newRouter.matcher
}
export default router
