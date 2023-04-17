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
    data: parmas,
  });
};
//获取产品详细信息（Detail）/api/item/{ skuId } GET
export const reqGoodsInfo = (skuId) => {
  return requests({
    url: `/item/${skuId}`,
    method: "get",
  });
};
//将产品添加到购物车  GET /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });
};
//获取购物车数据列表  GET /api/cart/carLsit
export const reqCartList = () => {
  return requests({
    url: "/cart/cartList",
    method: "get",
  });
};
//删除购物车商品 /api/cart/deleteCart/{skuId} DELETE
export const reqDeleteCreatById = (skuId) => {
  return requests({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete",
  });
};
//8.切换商品选中状态 /api/cart/checkCart/{skuID}/{isChecked} GET
export const reqUpdateCheckById=(skuId,isChecked)=>{
  return requests({
    url:`/cart/checkCart/${skuID}/${isChecked}`,
    method:'get'
  })
}