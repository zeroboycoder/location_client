import * as VueRouter from 'vue-router';
import HomePage from '../pages/HomePage.vue';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
  ]
})

router.beforeEach((to, from, next) => {
  const nextPath = to.path;
  if (to.path === nextPath) {
    next()
  } else {
    next(nextPath)
  }
})

export default router;