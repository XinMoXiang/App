import { reqCartList, reqDeleteCreatById, reqUpdateCheckById } from "@/api";
import { Promise } from "core-js";
//search模块的小仓库
const state = {
  //仓库初始状态
  cartList: [],
};
const mutations = {
  //修改state状态
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
const actions = {
  //获取数据
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },
  //删除购物车某一条商品信息
  async deleteCreateListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCreatById(skuId);
    if (result.code == 200) {
      return "success";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //修改购物车商品的选择状态
  async updateCheckById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckById(skuId, isChecked);
    if (result.code == 200) {
      return "success";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //删除全选购物车信息
  deleteAllCheckCart({ dispatch, getters }) {
    //context【小仓库】commit【提交mutations修改state】getters【计算属性】 dispatch【派发action】state【当前仓库数据】
    let promiseAll = [];
    getters.cartList.cartInfoList.forEach((element) => {
      let promise =
        element.isChecked == 1
          ? dispatch("deleteCreateListBySkuId", element.skuId)
          : "";
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
  },
  //修改全部产品的状态
  updateAllCartChecked({ dispatch, state }, isChecked) {
    let promiseAll = [];
    state.cartList[0].cartInfoList.forEach((element) => {
      let promise = dispatch("updateCheckById", {
        skuId: element.skuId,
        isChecked,
      });
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
  },
};
//getters一般是用于简化数据
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
