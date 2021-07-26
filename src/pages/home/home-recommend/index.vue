<template>
  <scroll-view
    class="scrollClass"
    scroll-y="true"
    @scrolltolower="handleToLower"
    v-if="months"
  >
    <!-- 推荐顶部 -->
    <view class="recommendTop">
      <view v-for="(item, index) in recommend" :key="index" class="imageItem">
        <image :src="item.thumb"></image>
      </view>
      <!-- 月份显示 -->
      <view class="month">
        <view class="monthTop">
          <sapn class="monthLeft">
            <span class="monthLeft1">{{ monthMM }}/{{ monthDD }}</span>
            <span class="monthLeft2">{{ months.title }}</span>
          </sapn>
          <sapn class="monthRight">更多 > </sapn>
        </view>
      </view>
      <view class="monthContent">
        <view
          v-for="(item, index) in months.items"
          :key="index"
          class="monthItems"
        >
          <component1 :list="months.items" :index="index">
            <image
              :src="item.thumb + item.rule.replace('$<Height>', 360)"
            ></image>
          </component1>
        </view>
      </view>
      <!-- 热门推荐 -->
      <view class="hot">
        <view class="hottitle">热门</view>
        <view class="hotContent">
          <view v-for="(item, index) in hot" :key="index" class="monthItems">
            <component1 :list="hot" :index="index">
              <image mode="heightFix" :src="item.thumb"></image>
            </component1>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import moment from "moment";
import component1 from "../../components/index.vue";
export default {
  data() {
    return {
      recommend: [],
      months: null,
      monthMM: null,
      monthDD: null,
      hot: [],
      params: {
        limit: 30,
        order: "hot",
        skip: 0,
      },
      index: true,
    };
  },
  mounted() {
    this.recommendRequest();
    uni.setNavigationBarTitle({ title: "首页" });
  },
  methods: {
    recommendRequest() {
      this.request({
        url: "http://service.picasso.adesk.com/v3/homepage/vertical",
        data: this.params,
      }).then((res) => {
        console.log(res)
        if (res.res.vertical.length === 0) {
          this.index = false;
        }
        if (this.recommend.length === 0) {
          this.recommend = res.res.homepage[1].items;
          this.months = res.res.homepage[2];
          this.monthMM = moment(this.months.stime).format("MM");
          this.monthDD = moment(this.months.stime).format("DD");
        }
        this.hot = [...this.hot, ...res.res.vertical];
      })
      .catch(res=>{
      console.log("出错1")
  })
    },

    handleToLower() {
      if (this.index) {
        this.params.skip += this.params.limit;
        this.recommendRequest();
      }
    },
  },
  components: {
    component1,
  },
};
</script>

<style lang="scss" scoped>
.scrollClass {
  height: calc(100vh - 36px);
}
.recommendTop {
  display: flex;
  flex-wrap: wrap;
}
.imageItem {
  width: 50%;
  image {
    height: 250rpx;
  }
}
.month {
  width: 100%;
  .monthTop {
    padding: 20rpx;
    width: 100%;
    .monthLeft {
      .monthLeft1 {
        color: deeppink;
        margin-right: 20rpx;
      }
    }
    .monthRight {
      float: right;
      margin-right: 20rpx;
      color: deeppink;
    }
  }
}
.monthContent {
  display: flex;
  flex-wrap: wrap;
  .monthItems {
    width: 32%;
    border: 5rpx solid white;
  }
}

.hot {
  .hottitle {
    border-left: 5rpx solid deeppink;
    font-size: 36rpx;
    margin: 20rpx;
    padding: 10rpx;
  }

  .hotContent {
    display: flex;
    flex-wrap: wrap;
    .monthItems {
      width: 32%;
      border: 5rpx solid white;
    }
  }
}
</style>