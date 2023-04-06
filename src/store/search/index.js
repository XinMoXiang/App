import { reqGetSearchInfo } from "@/api";
//search模块的小仓库
const state = {
  //仓库初始状态
  searchList: {},
};
const mutations = {
  //修改state状态
  GetSAERCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const actions = {
  //获取数据
  async getSearchList({ commit }, parmas = {}) {
    let result = await reqGetSearchInfo(parmas);
    if (result.code == 200) {
      commit("GetSAERCHLIST", result.data);
    }
  },
};
//getters一般是用于简化数据
const getters = {
  goodsList(state) {
    return state.searchList.goodsList||[];
  },
  trademarkList(state){
    return state.searchList.trademarkList;
  },
  attrsList(state){
    return state.searchList.attrsList;
  }
};
export default {
  state,
  mutations,
  actions,
  getters,
};
