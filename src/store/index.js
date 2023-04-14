import Vue from "vue";
import Vuex from "vuex";

//使用vuex
Vue.use(Vuex);

//引入小仓库
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";

//对外暴露store累的一个实例
export default new Vuex.Store({
  //实现Vuex仓库模块式开发存储数据
  modules: {
    home,
    search,
    detail,
    shopcart,
  },
});
