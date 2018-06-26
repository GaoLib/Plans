import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Trip from '@/components/Trip'
import Details from '@/components/Details'
import Food from '@/components/Food'
import Out from '@/components/Out'
import tripD from '@/components/tripD'
import Index from '@/Index'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children:[
        { path: 'trip', component: Trip },
        { path: 'food', component: Food },
        { path: 'out', component: Out }
      ]
    },
    {
      path: '/details',
      name: 'Details',
      component: Details,
       children:[
                    { path: 'tripD/:id', component: tripD}
                ]

     }
  ]
})
