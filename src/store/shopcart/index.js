import { reqCartList, reqDeleteCreatById,reqUpdateCheckById } from "@/api";
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
    if(result.code==200){
      return 'success'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  //修改购物车商品的选择状态
  async updateCheckById({commit},skuId,isChecked){
    let result=await reqUpdateCheckById(skuId,isChecked);
    if(result.code==200){
      return 'success'
    }else{
      return Promise.reject(new Error('faile'))
    }
  }
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
