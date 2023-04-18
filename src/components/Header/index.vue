<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 用户没有登录，显示登录注册 -->
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/resgister" class="register">免费注册</router-link>
          </p>
          <!-- 用户登录后，显示用户信息 -->
          <p v-else>
            <span>{{ userName }}</span>
            <a class="register" @click="loginout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <router-link class="register" to="/shopcart">我的购物车</router-link>
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
    //搜索（search）按钮的回调函数,需要向search路由进行跳转
    goSearch() {
      //多次点击搜索报错 .catch(err => err)
      //this.$router.push({path:'/search'}).catch(err => err);
      //路由传参
      //1.字符串传参
      // this.$router.push({ path: '/search/' +this.keyword+"?k="+this.keyword.toUpperCase()}).catch(err => err);
      //2.模板字符串 `` 反字符串
      // this.$router.push({ path: `/search/${this.keyword}?k=${this.keyword.toUpperCase()}`}).catch(err => err);
      //3.对象传参(最常用)
      if (this.$route.query) {
        //如果有query参数，也需要传query参数
        let location = {
          name: "search",
          params: { keyword: this.keyword || undefined }
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }
      //console.log(this.$router  );
      /******************************/
      //路由跳转传参的时候，对象的写法可以是name，path形式，但需要住的是，path写法不能与parms参数一起使用
      //如何指定parmas参数可以传递参数可以传递，不传递，在配置路由的时候在占位的后面加上一个问号【parmas可以传递或不传递】
      //可以使用undefined解决parms参数传递空值或者不传值
      //路由组件可以传递props数据，且有三种写法（布尔，对象，函数）
    },
    //退出登录
    async loginout() {
      try {
        await this.$store.dispatch("LoginOut");
        this.$router.push("/home");
      } catch (error) {
        alert(error.message)
      }

    },
  },
  mounted() {
    //通过全局事件总线清除关键字
    this.$bus.$on("clear", () => {
      this.keyword = "";
    })
  },
  computed: {
    userName() {
      return this.$store.state.user.userInfo.name;
    }
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