import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLoginOut,
} from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";
//search模块的小仓库
const state = {
  //仓库初始状态
  code: "",
  token: getToken(),
  userInfo: {},
};
const mutations = {
  //修改state状态
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  USERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  CLEAR(state) {
    state.token = "";
    state.userInfo = {};
    removeToken();
  },
};
const actions = {
  //获取验证码数据
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GETCODE", result.data);
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
  //用户注册
  async getUserRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    if (result.code == 200) {
      return "success";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
  //登录
  async userLogin({ commit }, user) {
    let result = await reqUserLogin(user);
    //token：某一用户的唯一标识符
    if (result.code == 200) {
      commit("USERLOGIN", result.data.token);
      //持久化存储token
      // localStorage.setItem("TOKEN",result.data.token);
      setToken(result.data.token);
      return "success";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
  //用户信息获取
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      commit("USERINFO", result.data);
      return "success";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
  //退出登录
  async LoginOut({ commit }) {
    let result = await reqLoginOut();
    //action无法操作state，只能由mutations操作state
    if (result.code == 200) {
      commit("CLEAR");
      return "success";
    } else {
      return Promise.reject(new Error(result.message));
    }
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
