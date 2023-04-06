<template>
  <div class="type-nav">
    <div class="container">
      <!--事件委派-->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!--三级联动 添加动画-->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class=" all-sort-list2" @click="goSearch">
              <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                :class="{ cur: currentIndex == index }">
                <h3 @mouseenter="chageIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <div class="item-list clearfix" :style="{ display: currentIndex == index ? 'block' : 'none' }">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName
                        }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName
                          }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
//这个引入方式将lodash的全部函数都引入了
//最好的映入方式是：按需引入
import throttle from 'lodash/throttle'
export default {
  data() {
    return {
      //存储用户鼠标移上哪一个分级
      currentIndex: -1,
      show: true
    }
  },
  name: 'TypeNav',
  //当组件挂在完毕：可以向服务器发送请求
  mounted() {
    //当组件挂载完毕，且当前理由不为home，将show值修改为false
    if (this.$route.path != '/home') {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      //右侧需要一个函数，当前使用这个计算属性的时候，右侧函数会立即执行一次
      //注入一个参数state，其实即为大仓库中的数据
      categoryList: state => state.home.categoryList
    })
  },
  methods: {
    //节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
    chageIndex: throttle(function (index) {
      //鼠标进入修改响应式数据CurrIndex属性
      this.currentIndex = index;
    }, 50),
    //一级分类鼠标溢出事件回调
    leaveIndex() {
      //鼠标移出是将currentIndex变为非index（-1，-2，-3....）

      this.currentIndex = -1;
      //判断路由在哪
      if (this.$route.path != '/home') {
        this.show = false;
      }
    },
    //点击三级联动跳转方法
    goSearch(event) {
      //最好的解决方案：编程式导航+事件委托
      //需要解决的问题：1.点击的一定是a标签2.如何获取参数【1,2,3级分类的产品名字；id】
      //解决问题1：将a标签加上自定义属:data-categoryName，其余没有，就能确定点击的是a标签了
      let element = event.target;
      //获取a标签的自定义属性，使用dataset
      let { categoryname, category1id, category2id, category3id } = element.dataset;
      //找到a标签
      if (categoryname) {
        let location = { name: 'search' };
        let query = { categoryName: categoryname };
        //区分一级，二级，三级a标签
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }
        //参数整理完毕
        //判断如果路由跳转的时候，带有params参数，将params参数也传递过去
        if (this.$route.params) {
          //参数整理并合并
          location.params = this.$route.params;
          location.query = query;
          //路由跳转
          this.$router.push(location);

        }
      }
    },
    //当鼠标移入的时候，让商品分类列表进行展示
    enterShow() {
      this.show = true;
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            //display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }

        .cur {
          background: skyblue;
        }

        // .item:hover{background: skyblue;}
      }
    }

    //过渡动画的样式
    //过渡动画开始状态(进入)
    .sort-enter {
      height: 0px;
    }

    //过渡动画结束(进入)
    .sort-enter-to {
      height: 461px;
    }

    .sort-enter-active {
      transition: all 0.5s linear;
      overflow: hidden;
    }

    .sort-leave {
      height: 461px;
    }

    //过渡动画结束(进入)
    .sort-leave-to {
      height: 0px;
    }

    .sort-leave-active {
      transition: all 0.5s linear;
      overflow: hidden;
    }
  }
}
</style>