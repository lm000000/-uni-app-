<template>
  <view>
    <view class="navigat">
      <view class="navigatTitle">
        <view class="navigatLeft">
          <uni-segmented-control
            :current="current"
            :values="items"
            @clickItem="onClickItem"
            styleType="text"
            activeColor="#d4237a"
          ></uni-segmented-control>
          <view class="navigatRight"><i class="iconfont icon-sousuo"></i></view>
        </view>
      </view>
      <view class="navigatContent">
        <view v-if="current === 0"> <recommend></recommend> </view>
        <view v-if="current === 1"> <category></category> </view>
        <view v-if="current === 2"> <homenew></homenew> </view>
        <view v-if="current === 3"> <album></album> </view>
      </view>
    </view>
  </view>
</template>

<script>
import { album } from "./home-album";
import { category } from "./home-category";
import { homenew } from "./home-new";
import { recommend } from "./home-recommend";
import { uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
  components: {
    album,
    homenew,
    category,
    recommend,
    uniSegmentedControl,
  },
  data() {
    return {
      items: ["推荐", "分类", "最新", "专辑"],
      current: 0,
    };
  },
  methods: {
    onClickItem(e) {
      if (this.current != e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
  },
};
</script>
<style lang="scss">
.navigatTitle {
  position: relative;
}
.navigatLeft {
  width: 60%;
  margin: 0 auto;
  .navigatRight {
    position: absolute;
    right: 20rpx;
    top: 50%;
    transform: translateY(-60%);
  }
}
</style>