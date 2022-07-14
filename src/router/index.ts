import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import LicenseView from '../views/LicenseView.vue'
import AuthHelper from '../helpers/AuthHelpers';
import UserView from '../views/UserView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/licenses',
    name: 'licenses',
    component: LicenseView
  },
  {
    path: '/products',
    name: 'products',
    component: HomeView
  },
  {
    path: '/clients',
    name: 'clients',
    component: HomeView
  },
  {
    path: '/accruals',
    name: 'accruals',
    component: HomeView
  },
  {
    path: '/users',
    name: 'users',
    component: UserView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach((to, from, next) => {
  const publicPages = ['login'];
  const currentPage = String(to.name || to.path.replace('/', ''));
  const authRequired = !publicPages.includes(currentPage);
  const loggedIn = true;

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  if(to.name === 'login' && loggedIn){
    return next('/');
  }

  next();
});

export default router
