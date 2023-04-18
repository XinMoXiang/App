import { reqAddressInfo,reqOrderInfo } from "@/api";
//search模块的小仓库
const state = {
  //仓库初始状态
  address:[],
  orderInfo:{},
};
const mutations = {
  //修改state状态
  GETUSERADDRESS(state,address){
    state.address=address;
  },
  GETORDERINFO(state,orderInfo){
    state.orderInfo=orderInfo;
  }
};
const actions = {
  //获取用户地址数据
  async getUserAddress({ commit }) {
    let result = await reqAddressInfo();
    if(result.code==200){
      commit('GETUSERADDRESS',result.data);
    }
  },
  //获取订单交易页信息
  async getOrderInfo({commit}){
    let result = await reqOrderInfo();
    if(result.code==200){
      commit('GETORDERINFO',result.data);
    }
  }
};
//getters一般是用于简化数据
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
