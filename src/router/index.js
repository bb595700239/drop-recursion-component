import Vue from 'vue'
import Router from 'vue-router'

import craftLine from '@/view/craftLine.vue'



Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/craftLine',
    },
    {
      path: '/craftLine',
      component: craftLine,
      name: '工艺路线'
    }
  ]
})
