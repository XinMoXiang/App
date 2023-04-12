// @ts-nocheck
//配置路由
import Vue from "vue";
import VueRouter from "vue-router";

//引入路由配置
import routes from "./routes";

//使用插件
Vue.use(VueRouter);

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
  routes,
  scrollBehavior() {
    return { y: 0 };
  },
});
