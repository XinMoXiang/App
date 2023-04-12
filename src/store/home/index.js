import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";
//home模块的小仓库
const state = {
  //state中的数据默认值不能乱写
  //三级联动菜单数据
  categoryList: [],
  //轮播图数据
  bannerList: [],
  //floor数据
  floorList: [],
};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNER(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOOR(state, floorList) {
    state.floorList = floorList;
  },
};
const actions = {
  //通过api里面的接口函数，向服务器发请求，获取服务器的数据
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      commit("CATEGORYLIST", result.data);
    }
  },
  //获取首页轮播图数据
  async getBannerList({ commit }) {
    let result = await reqGetBannerList();
    if (result.code == 200) {
      commit("GETBANNER", result.data);
    }
  },
  //获取foolr的数据
  async reqFloorList({ commit }) {
    let result = await reqGetFloorList();
    if (result.code == 200) {
      commit("GETFLOOR", result.data);
    }
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
