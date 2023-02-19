import Vue from 'vue'
import VueRouter from 'vue-router'
import Exercise1 from '../views/Exercise1.vue'
import Exercise2 from '../views/Exercise2.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/exercise-1',
      name: 'exercise-1',
      component: Exercise1
    },
    {
      path: '/exercise-2',
      name: 'exercise-2',
      component: Exercise2
    }
  ]
})

export default router
