import { reqCartList } from "@/api";
//search模块的小仓库
const state = {
  //仓库初始状态
};
const mutations = {
  //修改state状态
};
const actions = {
  //获取数据
  async getCartList({ commit }) {
    let result = await reqCartList();
    console.log(result);
  },
};
//getters一般是用于简化数据
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
