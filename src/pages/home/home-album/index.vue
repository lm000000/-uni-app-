<template>
  <scroll-view class="scrollView1" scroll-y="true" @scrolltolower="handleToLower()">

<!--   autoplay 自动轮播  indicator-dots有索引 circular是否循环轮播 
swiper默认高度是150px
image默认宽度320px
image默认高度240px
在不同的屏幕下轮播不是响应式的 高度固定
所以用图片的宽高比例来协调swiper
此图片比例为640/248=2.3 -->
    <swiper autoplay indicator-dots circular>
      <swiper-item v-for="(item, index) in banner" :key="index">
        <image mode="widthFix" :src="item.thumb"></image>
      </swiper-item>
    </swiper>

    <view class="waicontent">
      <navigator class="content" v-for="(item, index) in album" :key="index" 
      :url="`/pages/albumDetail/index?id=${item.id}`">
        <view class="contentLeft">
          <!-- mode=""aspectFill  是图片按照等比例缩放 -->
          <image mode="aspectFill" :src="item.cover"></image>
        </view>
        <view class="contentRight">
          <view class="contentRight1">【独家】{{ item.name }}</view>
          <view class="contentRight2">{{ item.desc }}</view>
          <view class="contentRight13">+ 关注</view>
        </view>
      </navigator>
    </view>
  </scroll-view>
</template>

<script>
export default {
  mounted() {

    uni.setNavigationBarTitle({ title: "专辑" });
    this.albumRequest();
  },
  data() {
    return {
      params: {
        limit: 30,
        order: "new",
        skip:0,
      },
      album: [],
      banner: [],
      tupian: [
        {
          thumb: "../../../static/image/lunbo.jpeg",
        },
      ],
    };
  },
  methods: {
    albumRequest() {
      this.request({
        url: "http://service.picasso.adesk.com/v1/wallpaper/album",
        data: this.params,
      }).then((res) => {
        this.album = [...this.album,...res.res.album];
        if(this.banner.length===0){
        this.banner = res.res.banner;
        this.banner = [...this.banner, ...this.tupian];
        }
      })
      .catch(res=>{
    console.log("出错")
  })
    },
    handleToLower(){
       this.params.skip+=this.params.limit
       this.albumRequest() 
    }
  },
};
</script>

<style lang="scss" scoped>
.scrollView1{
  height:calc(100vh - 36px);
}
swiper {
  height:calc(750rpx / 2.3);
}
.waicontent {
  margin-top:30rpx;
  .content {
    position: relative;
    .contentLeft {
      padding:20rpx;
      image{
            width:200rpx;
            height:300rpx;
      }
    }

    .contentRight {
      padding:0 50rpx 0 50rpx;
      position: absolute;
      top:20rpx;
      left:200rpx;
      .contentRight1 {
         
      }

      .contentRight2 {
        width: 400rpx;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
         font-size:30rpx;
         opacity: 0.4;
         margin-top:50rpx;
      }

      .contentRight13 {
        position:absolute;
        bottom: -150rpx;
        right:0;
          border:5rpx solid deeppink;
          color:deeppink
      }
    }
  }
}

</style>