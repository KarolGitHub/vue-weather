import VueRouter from 'vue-router';
import Vue from 'vue';
import Home from '@/views/Home';
import Login from '@/views/Login';
import Register from '@/views/Register';
import Blog from '@/views/Blog';
import Forecast from '@/views/Forecast';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    exact: true,
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      hideForAuth: true
    },
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      hideForAuth: true
    },
    component: Register
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/forecast',
    name: 'Forecast',
    component: Forecast,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
  if (to.matched.some((record) => record.meta.hideForAuth)) {
    if (store.getters.isLoggedIn) {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
