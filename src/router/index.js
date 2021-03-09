import Vue from 'vue'
import VueRouter from 'vue-router'

import guitar from '../Page/guitar/Guitar.vue'
import necklace from '../Page/necklace/Necklace.vue'
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)


const routes = [
        {
        path: '',
        redirect:'/modelshow1',
        name: 'model1',
  
      },
      {
        path:'/modelshow1',
        component:guitar,

      },
      {
        path:'/modelshow2',
        component:necklace
      }

  ]


const router = new VueRouter({
    routes,
    mode: 'history',

})

export default router
