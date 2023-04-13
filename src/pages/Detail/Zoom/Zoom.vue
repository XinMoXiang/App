<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <!-- 显示放大的图片 -->
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ['skuImageList'],
  data() {
    return {
      cuurrrntIndex: 0,
    }
  },
  mounted() {
    //全局事件总线，获取索引值（chagecurrentIndex）
    this.$bus.$on("getIndex", (index) => {
      this.cuurrrntIndex = index;
    })
  },
  computed: {
    imgObj() {
      return this.skuImageList[this.cuurrrntIndex] || {};
    }
  },
  methods: {
    handler(event) {
      let mask = this.$refs.mask;
      let big = this.$refs.big;
      //计算遮罩的左值以及顶部的值
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;
      //判断方位超出的情况
      if (left < 0) {
        left = 0;
      } else if (left > mask.offsetWidth) {
        left = 200;
      }
      if (top < 0) {
        top = 0;
      } else if (top > mask.offsetHeight) {
        top = 200;
      }
      //将遮罩以及big图赋值定位  （此外big图为普通图的两倍大小 且方位为负值）
      mask.style.left = left + 'px';
      mask.style.top = top + 'px';
      big.style.left = -2 * left + 'px';
      big.style.top = -2 * top + 'px';
    }
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover~.mask,
  .event:hover~.big {
    display: block;
  }
}
</style>