<template>
  <div>
    <Header></Header>
    <!-- 我是根组件 -->
    <router-view></router-view>
    <!--当路由指向login和resgister时Footer组件不需要展示-->
    <!-- v-show="$route.path=='/home'||$route.path=='/search'" -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer"
export default {
  components: {
    Header,
    Footer
  },
  mounted() {
    //派发一个action||获取商品分类三级列表的数据
    //通过Vuex发送请求，获取数据，存储于仓库里
    this.$store.dispatch('categoryList');
  }
}
</script>

<style></style>