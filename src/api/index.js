//当前的这个模块：API进行统一管理
import requests from "./request";
import mock from "./mock";

//三级联动接口
// /api/product/getBaseCategoryList get 无参数

//发请求:axios发请求返回结果Prmiose对象
export const reqCategoryList = () => {
  return requests({
    url: "/product/getBaseCategoryList",
    method: "get",
  });
};
//获取banner（home首页轮播图）
export const reqGetBannerList = () => mock.get("/banner");
//获取floor数据
export const reqGetFloorList = () => mock.get("/floor");
//获取search(搜索)数据 api/list 请求方式:post 有参数
export const reqGetSearchInfo = (parmas) => {
  return requests({
    url: "/list",
    method: "post",
    data:parmas
  });
};