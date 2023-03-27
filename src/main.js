import Vue from 'vue';
import App from './App.vue';
Vue.config.productionTip = false;
//三级联动组件---全局组件
import TypeNav from '@/pages/Home/TypeNav';
//参数一：组件名字；参数二：那一个组件
Vue.component(TypeNav.name,TypeNav);
//引入路由
import router from '@/router';
new Vue({
  render: h => h(App),
  //注册路由:键值对写法 ES6新语法省略值
  //注册路由 当这里书写router的时候，组件身上都有$route,$router
  //$route:一般获取路由信息【路径，query，prams】(路由)
  //$router:一般进行编程式导航进行㕛跳转 (路由器)
  router
}).$mount('#app')
