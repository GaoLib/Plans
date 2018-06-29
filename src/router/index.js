import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Trip from '@/components/Trip'
import Details from '@/components/Details'
import Food from '@/components/Food'
import Out from '@/components/Out'
import tripD from '@/components/tripD'
import foodD from '@/components/foodD'
import Index from '@/Index'
import outD from '@/components/outD'
import Add from '@/components/Add'
import tripA from '@/components/tripA'

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
                    { path: 'tripD/:id', component: tripD},
                    { path: 'foodD/:id', component: foodD},
                    { path: 'outD/:id', component: outD}
                ]

     },
     {
      path:'/add',
      name:'Add',
      component:Add,
      children:[
        { path:'tripA',component:tripA }
      ]
     }
  ]
})
