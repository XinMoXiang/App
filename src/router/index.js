// @ts-nocheck
//配置路由
import Vue from "vue";
import VueRouter from "vue-router";

//引入路由配置
import routes from "./routes";

//引入store
import store from "@/store";
import user from "@/store/user";

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
let router = new VueRouter({
  //配置路由
  routes,
  scrollBehavior() {
    return { y: 0 };
  },
});

//全局守卫，前置守卫
router.beforeEach(async (to, from, next) => {
  //to：即将跳转的，
  //from：将要离开的，
  //next：调用方法，才能离开 next（）放行 next（'/'）放行到指定的路由
  //获取用户的登录token
  let token = store.state.user.token;
  //用户信息
  let name = store.state.user.userInfo.name;
  //用户登录
  if (token) {
    //用户登陆后只能去除了登录意外的页面
    if (to.path == "/login") {
      next("/home");
    } else {
      //用户名已有
      if (name) {
        next();
      } else {
        try {
          //派发用户信息action
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          store.dispatch("LoginOut");
          next("/login");
        }
      }
    }
  } else {
    //未登录
    let toPath = to.path;
    if (
      toPath.indexOf("/trade") != -1 ||
      toPath.indexOf("/pay") != -1 ||
      toPath.indexOf("/center") != -1
    ) {
      //next("/login");
      next("/login?redirect=" + toPath);
    } else {
      next();
    }
  }
});

export default router;
