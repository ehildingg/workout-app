import { createRouter, createWebHashHistory } from 'vue-router'

import StartView from './views/StartView.vue'
import EditView from './views/EditView.vue'
import TimerView from './views/TimerView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: TimerView,
      path: '/timer'
    },
    {
      component: EditView,
      path: '/edit'
    },
    {
      component: StartView,
      path: '/'
    }
  ]
})
