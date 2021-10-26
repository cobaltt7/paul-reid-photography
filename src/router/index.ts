import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
console.log(galleries)

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Home
  },
];
(galleries).forEach(gallery => {
  routes.push(
    {
      path: '/'+gallery.slug,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "gallery" */ '../views/Gallery.vue'),
      props: { gallery }
    })
})
routes.push(
  {
    path: "*",
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  })

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
