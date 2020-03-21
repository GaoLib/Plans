import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		children:[
			{ path: 'trip', component: () => import('@/components/Trip.vue') },
			{ path: 'food', component: () => import('@/components/Food.vue') },
			{ path: 'out', component: () => import('@/components/Out.vue') }
		]
	},
	{
		path: '/details',
		name: 'Details',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import('@/components/Details.vue'),
		children:[
			{ path: 'tripD/:id', component: () => import('@/components/TripDetail.vue')},
			{ path: 'foodD/:id', component: () => import('@/components/FoodDetail.vue')},
			{ path: 'outD/:id', component: () => import('@/components/OutDetail.vue')}
		]
	},
	{
		path: '/add',
		name: 'Add',
		component: () => import('@/components/Add.vue'),
		children:[
			{ path:'tripA',component:() => import('@/components/AddTrip.vue') },
			{ path:'foodA',component:() => import('@/components/AddFood.vue') },
			{ path:'outA',component:() => import('@/components/AddOut.vue') }
		]
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
