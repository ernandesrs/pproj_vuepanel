import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/auth',
      component: () => import('../layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'auth.login',
          component: () => import('../views/Auth/LoginView.vue')
        },
        {
          path: 'register',
          name: 'auth.register',
          component: () => import('../views/Auth/RegisterView.vue')
        },
        {
          path: 'forget',
          name: 'auth.forget',
          component: () => import('../views/Auth/ForgetView.vue')
        },
        {
          path: 'update-password',
          name: 'auth.update-password',
          component: () => import('../views/Auth/UpdatePasswordView.vue')
        }
      ]
    },
    {
      path: '/app',
      component: () => import('../layouts/AppLayout.vue'),
      children: [
        {
          path: '',
          name: 'app.home',
          component: () => import('../views/App/HomeView.vue')
        },
        {
          path: 'perfil',
          name: 'app.profile',
          component: () => import('../views/App/ProfileView.vue')
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('../views/Admin/HomeView.vue'),
      children: [
        {
          path: '',
          name: 'admin.home',
          component: () => import('../views/Admin/HomeView.vue')
        },
      ]
    }
  ]
})

export default router
