import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cardapio from '../views/Cardapio.vue'
import Pedido from '../views/Pedido.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/Cardapio',
    name: 'Cardapio',
    component: Cardapio
  },{
    path: '/Pedido',
    name: 'Pedido',
    component: Pedido
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
