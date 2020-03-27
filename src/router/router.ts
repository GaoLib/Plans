import Main from '../views/Home.vue'

export const constantRouterMap = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/Login.vue')
	},
	{
		path: '/main',
		name: 'main',
		redirect: '/',
		component: Main
	},
	{
		path: '/404',
		name: 'nofound',
		component: () => import('@/views/NoFound.vue')
	}
]


export const asyncRouterMap = [
	{
		path: '/',
		name: 'home',
		redirect: '/out',
		component: () => import('@/views/Home.vue'),
		children:[
			{ path: 'trip', name: 'trip_list', component: () => import('@/components/Trip.vue') },
			{ path: 'food', name: 'food_list', component: () => import('@/components/Food.vue') },
			{ path: 'out', name: 'out_list', component: () => import('@/components/Out.vue') }
		]
	},
	{
		path: '/details',
		name: 'details',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import('@/components/Details.vue'),
		children:[
			{ path: 'trip/:id', name: 'trip_detail', component: () => import('@/components/TripDetail.vue')},
			{ path: 'food/:id', name: 'food_detail', component: () => import('@/components/FoodDetail.vue')},
			{ path: 'out/:id', name: 'out_detail', component: () => import('@/components/OutDetail.vue')}
		]
	},
	{
		path: '/add',
		name: 'add',
		component: () => import('@/components/Add.vue'),
		children:[
			{ path:'trip',component:() => import('@/components/AddTrip.vue') },
			{ path:'food',component:() => import('@/components/AddFood.vue') },
			{ path:'out',component:() => import('@/components/AddOut.vue') }
		]
	}
]