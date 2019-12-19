import Vue from 'vue'
import ElementUI from 'element-ui';            // 组件文件（js）
import 'element-ui/lib/theme-chalk/index.css'; // 样式文件
import App from './App.vue'
import router from './router'

//阻止生产提示
Vue.config.productionTip = false

//引入公用样式
import '@/styles/common.less';

//引入封装好的axios
import requset from '@/api/requset.js';

//解构组件
import {Message} from 'element-ui';

Vue.use(ElementUI);

//Vue.prototype.axios = axios;
Vue.prototype.requset = requset;

//全局路由守卫，验证有没有token，有放行没有跳转至登录
router.beforeEach((to,from,next)=>{
  const token = window.localStorage.getItem('token');
  if(token){
    next();
  }else{
    if(to.path === '/login'){
      next();
    }else{
      Message.error('请先登录')
      return next({'path':'/login'})
    }
  }
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
