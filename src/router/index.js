// @ts-nocheck
//配置路由
import Vue from "vue";
import VueRouter from "vue-router";

//使用插件
Vue.use(VueRouter);

//引入路由组件
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Resgister from "@/pages/Resgister";
import Search from "@/pages/Search";

//把VueRouter原型链对象的push方法保存一份
let orignPush = VueRouter.prototype.push;
let orginReplace = VueRouter.prototype.replace;

//重写push|replace
//第一个参数：告诉原来的push方法，你应该往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //call和apply的区别
    //相同点：都可以调用函数一次，都可以篡改函数上下文一次
    //不同点：call和apple传递参数时：call需要用'，'隔开，apply方法执行传递数组
    orignPush.call(this, location, resolve, reject);
  } else {
    orignPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    orginReplace.call(this, location.resolve.reject);
  } else {
    orginReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

//配置路由
export default new VueRouter({
  //配置路由
  routes: [
    {
      path: "/home",
      component: Home,
      meta: { show: true },
    },
    {
      path: "/login",
      component: Login,
      meta: { show: false },
    },
    {
      path: "/resgister",
      component: Resgister,
      meta: { show: false },
    },
    {
      path: "/search/:keyword?",
      component: Search,
      meta: { show: true },
      name: "search",
      //路由组件可以传递props参数(三种写法：布尔，对象，函数 函数最常用)
      // props:($route)=>{
      //   return{
      //     keyword:$route.params,
      //     k:$route.query.k
      //   }
      // }
    },
    //重定向,在项目跑起来的时候，访问/，立马定向到您所需的页面(首页)
    {
      path: "*",
      redirect: "/home",
    },
  ],
});
