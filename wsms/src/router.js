import Vue from 'vue'
import Router from 'vue-router'

//注册路由（使用路由）
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login', //路径
      name: 'login',//名字
      component: () => import('./views/login/Login.vue') //引入登录组件
    },
    {
      path: '/',
      name: 'index',//名字
      component: () => import('./views/Index/Index.vue'),
      children:[
        {
          path: '',
          name: 'home',//名字
          component:()=> import('./views/Home/Home.vue')
        },
        {
          path: '/contractmanage',
          name: 'contractmanage',//名字
          component:()=> import('./views/ContractManage/ContractManage.vue')
        },
        {
          path: '/contractadd',
          name: 'contractadd',//名字
          component:()=> import('./views/ContractAdd/ContractAdd.vue')
        },
        {
          path: '/contractborrow',
          name: 'contractborrow',//名字
          component:()=> import('./views/contractBorrow/contractBorrow.vue')
        }
      ]
    }
  ]
})
