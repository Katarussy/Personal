import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import StudentView from '../views/StudentView.vue'
import AdminView from '../views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/student',
      name: 'student',
      component: StudentView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    }
  ]
})

export default router