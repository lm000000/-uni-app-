<template>
  <view>
      <scroll-view scroll-y="true" @scrolltolower="scrolll()" class="scroll">
    <view class="navigatTitle">
      <view class="navigatLeft">
        <uni-segmented-control
          :current="current"
          :values="items"
          @clickItem="onClickItem"
          styleType="text"
          activeColor="#d4237a"
        ></uni-segmented-control>
      </view>
    </view>
    <view class="img">
      <view class="imgDetail" v-for="(item, index) in imgData" :key="index">
        <component1 :list="imgData" :index="index">
        <image mode="aspectFill" :src="item.thumb"></image>
        </component1>
      </view>
    </view>
      </scroll-view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import component1 from "../components/index.vue"
export default {
  onLoad(options) {
    this.id = options.id;
    this.requestData();
  },
  data() {
    return {
      id: null,
      params: {
        limit: 30,
        skip: 0,
        order: "new",
      },
      imgData: [],
      items: ["最新", "最热"],
      current: 0,
    };
  },
  methods: {
    onClickItem(e) {
      if (this.current != e.currentIndex) {
        this.current = e.currentIndex;
      }
       if(this.current===0){
            this.params.order="new"
        }else{
            this.params.order="hot"
        }
       this.requestData(true)
    },
    requestData(flag) {
      this.request({
        url: `http://service.picasso.adesk.com/v1/vertical/category/${this.id}/vertical`,
        data: this.params,
      }).then((res) => {
        if(flag){
            this.imgData =res.res.vertical
        }else{
          this.imgData=[...this.imgData,...res.res.vertical]
        }
        }
      )
      .catch(res=>{
    console.log("出错")
  })
    },
    scrolll(){
        console.log("as")
        this.params.skip+=this.params.limit
        this.requestData(false)
    }
  },
  components: {
    uniSegmentedControl,
    component1
  },
};
</script>

<style lang="scss">
.img {
  display: flex;
  flex-wrap: wrap;
  .imgDetail {
    width: 32%;
    border: 5rpx solid white;
    image {
      width: 100%;
      height: 400rpx;
    }
  }
}

.navigatTitle {
  position: relative;
  .navigatLeft {
    width: 60%;
    margin: 0 auto;
  }
}
.scroll{
    height:calc(100vh - 36px)
}
</style>