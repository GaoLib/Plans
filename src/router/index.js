import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Trip from '@/components/Trip'
import ComA from '@/components/ComA'
import Food from '@/components/Food'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Trip',
      component: Trip
    },
    {
      path: '/address',
      name: 'ComA',
      component: ComA
    },
    {
      path: '/food',
      name: 'Food',
      component: Food
    }
  ]
})
