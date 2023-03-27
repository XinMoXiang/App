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
  }
}
</script>

<style></style>