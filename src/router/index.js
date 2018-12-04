import Vue from 'vue'
import Router from 'vue-router'
import goodList from './../views/GoodsList.vue'
import Cart from './../views/Cart.vue'
import Address from './../views/Address.vue'
import OrderConfirm from './../views/OrderConfirm.vue'
import OrderSuccess from './../views/OrderSuccess.vue'
Vue.use(Router)

export default new Router({
  // mode:'history',
  //用url的方式，默认是用hash（#）
  routes: [
    {
      path: '/',
      name: 'goodList',
      component: goodList,
    },
    {
      path: "/cart",
      name: 'cart',
      component: Cart
    },
    {
      path: '/address',
      name: 'address',
      component: Address
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: OrderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: OrderSuccess
    }
  ]
})
