//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//引入进度条样式 进度条颜色修改nprogress .bar {background}
import "nprogress/nprogress.css";
//start()进度条开始，done（）进度条结束
//1.利用axios对象的方法create，去创建一个axios实例
//2.request就是axios，只不过自己配置了一小
const requests = axios.create({
  //配置对象
  //基础路径：发送请求的时候，路径当中会出现api
  baseURL: "/mock",
  //代表请求超时的时间5s，5s后请求超时，即为失败
  timeout: 5000,
});
//请求拦截器,在发请求之前，请求拦截器可以检测到，可以再请求发送到服务端之前做一些事情
requests.interceptors.request.use((config) => {
  //config：配置对象，对象里面有一个配置很重要，header(请求头)
  nprogress.start();
  return config;
});
//响应拦截器
requests.interceptors.response.use(
  (res) => {
    //成功的回调函数：服务器相应的数据回来以后，响应拦截器可以检测到，可以做一些事情
    nprogress.done();
    return res.data;
  },
  (error) => {
    //服务武器响应失败函数
    return Promise.reject(new Error('faile'));
  }
);

//对外暴露二次封装后的axios
export default requests;
