<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/resgister" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/home" target="_blank">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />

          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
//  可以这样写 goSearch(){       this.$router.push({path:'/search'})       }
export default {
  data() {
    return {
      keyword: ''
    }
  },
  methods: {

    goSearch() {
      //搜索（search）按钮的回调函数,需要向search路由进行跳转
      //多次点击搜索报错 .catch(err => err)
      //this.$router.push({path:'/search'}).catch(err => err);
      //路由传参
      //1.字符串传参
      // this.$router.push({ path: '/search/' +this.keyword+"?k="+this.keyword.toUpperCase()}).catch(err => err);
      //2.模板字符串 `` 反字符串
      // this.$router.push({ path: `/search/${this.keyword}?k=${this.keyword.toUpperCase()}`}).catch(err => err);
      //3.对象传参(最常用)
      this.$router.push({
        name: "search",
        params: { keyword: this.keyword },
        query: { K: this.keyword.toUpperCase() }
      })
      //console.log(this.$router  );
      /******************************/
      //路由跳转传参的时候，对象的写法可以是name，path形式，但需要住的是，path写法不能与parms参数一起使用
      //如何指定parmas参数可以传递参数可以传递，不传递，在配置路由的时候在占位的后面加上一个问号【parmas可以传递或不传递】
      //可以使用undefined解决parms参数传递空值或者不传值
      //路由组件可以传递props数据，且有三种写法（布尔，对象，函数）
    },
  }
}
</script>

<style lang="less" scoped>
.header {
  &>.top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          &+a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  &>.bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>