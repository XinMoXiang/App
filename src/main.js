import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;
//三级联动组件---全局组件
import TypeNav from "@/components/TypeNav";
//全局组件---轮播图
import Carousel from "@/components/Carousel";
//全局组件--分页
import Pagination from "@/components/Pagination";

//参数一：组件名字；参数二：那一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

//引入路由
import router from "@/router";
//引入仓库
import store from "@/store";
//引入mock
import "@/mock/mockServe";
//引入swiper
import "swiper/css/swiper.css";
//引入element-ui (全局引入)
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import { MessageBox } from "element-ui";

//引入lazyload(懒加载)
import VueLazyload from "vue-lazyload";

//使用Element-UI
//Vue.use(ElementUI);

//引入动图
import hutao from "@/assets/HuTao.gif";

//使用lazyload(懒加载)
Vue.use(VueLazyload, {
  loading: hutao,
});

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//统一接口的api文件请求
import * as API from "@/api";
new Vue({
  //el: '#app',
  render: (h) => h(App),
  //全局事件总线，$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由:键值对写法 ES6新语法省略值
  //注册路由 当这里书写router的时候，组件身上都有$route,$router
  //$route:一般获取路由信息【路径，query，prams】(路由)
  //$router:一般进行编程式导航进行路由跳转 (路由器)
  router,
  //注册仓库：组件示例的身上会多一个属性$store属性
  store,
}).$mount("#app");
