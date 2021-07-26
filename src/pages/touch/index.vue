<template>
  <view @touchstart="start" @touchend="end"> 
    <slot></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {
      time: null,
      startX: null,
      startY: null,
    };
  },
  methods: {
    start(event) {
      /* 获取按下的坐标 */
      this.startX = event.changedTouches[0].clientX;
      this.startY = event.changedTouches[0].clientY;
      this.time = Date.now();
    },
    end(event) {
      const endX = event.changedTouches[0].clientX;
      const endY = event.changedTouches[0].clientY;
      const endtime = Date.now();
      let result = null;
      if (endtime - this.time > 2000) {
        return;
      }
      if (Math.abs(endX - this.startX) > 10) {
        result = endX - this.startX > 0 ? "left" : "right";
        this.$emit("touch-data",result)
      } else {
        return;
      }
    },
  },
};
</script>

<style>

</style>