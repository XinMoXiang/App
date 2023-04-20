//引入一级路由组件
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Resgister from "@/pages/Resgister";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";

//引入一级路由组件
import myOrder from "@/pages/Center/myOrder";
import groupOrder from "@/pages/Center/groupOrder";

//路由配置信息
export default [
  {
    path: "/center",
    component: Center,
    meta: { show: true },
    children: [
      {
        path: "myorder",
        component: myOrder,
      },
      {
        path: "grouporder",
        component: groupOrder,
      },
      {
        path: "/center",
        redirect: "/center/myorder",
      },
    ],
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    meta: { show: true },
  },
  {
    path: "/pay",
    component: Pay,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade" || from.path == "/") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/trade",
    component: Trade,
    meta: { show: true },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == "/shopcart" || from.path == "/") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/shopcart",
    component: ShopCart,
    meta: { show: true },
  },
  {
    path: "/addcartsuccess",
    component: AddCartSuccess,
    name: "addcartsuccess",
    meta: { show: true },
  },
  {
    path: "/detail/:skuId",
    component: Detail,
    meta: { show: true },
  },
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
];
