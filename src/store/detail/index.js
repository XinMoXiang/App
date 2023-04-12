import { reqGoodsInfo } from "@/api";
//search模块的小仓库
const state = {
  //仓库初始状态
  goodinfo: {},
};
const mutations = {
  //修改state状态
  GETGOODINFO(state, goodinfo) {
    state.goodinfo = goodinfo;
  },
};
const actions = {
  //获取数据
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      commit("GETGOODINFO", result.data);
    }
  },
};
//getters一般是用于简化数据
const getters = {
  //简化路径导航数据
  categoryView(state) {
    return state.goodinfo.categoryView||{};
  },
  //简化产品信息数据
  skuInfo(state){
    return state.goodinfo.skuInfo||{};
  },
  //简化售卖属性数据
  spuSaleAttrList(state){
    return state.goodinfo.spuSaleAttrList||[];
  }
};
export default {
  state,
  mutations,
  actions,
  getters,
};
