import { createRouter, createWebHashHistory } from 'vue-router'

import RoutineView from './views/RoutineView.vue'
import ExerciseView from './views/ExerciseView.vue'
import EditView from './views/EditView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: RoutineView,
      path: '/'
    },
    {
      component: ExerciseView,
      path: '/timer'
    },
    {
      component: EditView,
      path: '/edit'
    }
  ]
})
