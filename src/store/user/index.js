import { reqGetCode, reqUserRegister, reqUserLogin } from "@/api";
//search模块的小仓库
const state = {
  //仓库初始状态
  code: "",
};
const mutations = {
  //修改state状态
  GETCODE(state, code) {
    state.code = code;
  },
};
const actions = {
  //获取验证码数据
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GETCODE", result.data);
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //用户注册
  async getUserRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    if (result.code == 200) {
      return "success";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //登录
  async userLogin({ commit }, user) {
    let result = await reqUserLogin(user);
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
