import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Trip from '@/components/Trip'
import tDetail from '@/components/tDetail'
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
      path: '/tDetail:id',
      name: 'tDetail',
      component: tDetail
    },
    {
      path: '/food',
      name: 'Food',
      component: Food
    }
  ]
})
