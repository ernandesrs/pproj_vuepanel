import { createRouter, createWebHistory } from 'vue-router'
import middleware from '../services/middleware'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: (to, from, next) => {
        next({ name: 'app.home' });
      },
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/auth',
      component: () => import('../layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'auth.login',
          beforeEnter: middleware.redirectIfAuthenticated,
          component: () => import('../views/Auth/LoginView.vue')
        },
        {
          path: 'register',
          name: 'auth.register',
          beforeEnter: middleware.redirectIfAuthenticated,
          component: () => import('../views/Auth/RegisterView.vue')
        },
        {
          path: 'forget',
          name: 'auth.forget',
          beforeEnter: middleware.redirectIfAuthenticated,
          component: () => import('../views/Auth/ForgetView.vue')
        },
        {
          path: 'update-password',
          name: 'auth.update-password',
          beforeEnter: middleware.redirectIfAuthenticated,
          component: () => import('../views/Auth/UpdatePasswordView.vue')
        },
        {
          path: 'verify-account',
          name: 'auth.verify-account',
          component: () => import('../views/Auth/VerifyAccountView.vue')
        }
      ]
    },
    {
      path: '/app',
      component: () => import('../layouts/AppLayout.vue'),
      beforeEnter: middleware.redirectIfUnauthenticated,
      children: [
        {
          path: '',
          name: 'app.home',
          component: () => import('../views/App/HomeView.vue')
        },
        {
          path: 'assinaturas',
          name: 'app.subscriptions',
          component: () => import('../views/App/SubscriptionsView.vue')
        },
        {
          path: 'assinaturas/nova-assinatura',
          name: 'app.subscriptions.new',
          component: () => import('../views/App/SubscriptionNewView.vue')
        },
        {
          path: 'cartoes-de-creditos',
          name: 'app.credit-cards',
          component: () => import('../views/App/CreditCardsView.vue')
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
      beforeEnter: middleware.redirectIfUnauthenticated,
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
