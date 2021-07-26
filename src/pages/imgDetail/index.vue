<template>
  <view v-if="comment">
    <view class="user">
      <image src="/static/image/touxiang.jpg">
      <span class="span1">我是小清新</span>
      <span class="span2">{{time}}</span>
    </view>
    <view class="thumbImg">
      <touch @touch-data="touchData">
      <image mode="top" :src="imgData.thumb">
      </image>
      </touch>
    </view>
    <view class="dianzan"> 
      <view class="spanLeft"><span class="iconfont icon-zan"></span>{{imgData.rank}}</view>
      <view class="spanRight"><span class="iconfont icon-aixin"></span>收藏</view>
    </view>
    <view class="comments" v-if="comment.length>0">
    <view class="wenzi1">评论</view>
    <view class="userComment" v-for="(item,index) in comment" :key="index">
      <image class="commentImg" :src="item.user.avatar"></image>
      <view class="commentName">{{item.user.name}}</view>
      <view class="commentContent">{{item.content}}</view>
      <view class="commentContent">{{item.content}}</view>
      <view class="commentContent">{{item.content}}</view>
    </view>
    </view>
    <view v-if="comment.length===0" class="noComment">暂无评论</view>
    <view class="xiazai" @click="imgClick">下载图片</view>
  </view>
</template>

<script>
import touch from "../touch/index.vue";
import moment from "moment";
moment.locale("zh-cn"); /* 设置成中文的表示方法 */
export default {
  data() {
    return {
      list: [],
      index: Number,
      imgData: null,
      time: null,
      comment: [],
    };
  },
  onLoad() {
    this.list = getApp().globalData.globalList;
    this.index = getApp().globalData.globalIndex;
    this.changeIndex();
  },
  methods: {
    changeIndex() {
      this.imgData = this.list[this.index];
      this.time = moment(this.imgData.atime * 1000).format("LL");
      this.getRequest(this.imgData.id);
    },
    getRequest(id) {
      this.request({
        url: `http://service.picasso.adesk.com/v2/wallpaper/wallpaper/${id}/comment`,
      }).then((res) => {
        this.comment = res.res.comment;
      })
      .catch(res=>{
    console.log("出错")
  })
    },
    touchData(data) {
      if (data === "right") {
        this.index += 1;
      } else {
        this.index -= 1;
      }
      if (this.index < this.list.length) {
        this.changeIndex();
      } else {
        return;
      }
    },
    /* 下载图片 */
    imgClick() {
      uni.downloadFile({
        /* 将文件下载到小程序的内存中（相册）*/
        url: this.imgData.thumb /* 网络图片路径 */,
        success: (res) => {
          if (res.statusCode === 200) {
            uni.saveImageToPhotosAlbum({
              /* 将文件(图片.音频等等)下载到本地 */
              filePath:
                res.tempFilePath /* 图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径 */,
              seccess: (res) => {
                console.log("成功");
              },
            });
          }
        },
      });
    },
  },
  components: {
    touch,
  },
};
</script>

<style lang="scss">
.user {
  padding: 30rpx;
  position: relative;
  image {
    height: 100rpx;
    width: 100rpx;
    border-radius: 50%;
    margin-right: 40rpx;
  }

  .span1 {
    position: absolute;
    top: 35rpx;
  }

  .span2 {
    position: relative;
    font-size: 28rpx;
    opacity: 0.5;
    bottom: 0;
  }
}
.thumbImg {
  height: 500rpx;
  overflow: hidden;
}

.dianzan {
  width: 100%;
  .spanLeft {
    float: left;
    width: 50%;
    text-align: center;
  }
  .spanRight {
    float: right;
    text-align: center;
    width: 50%;
  }
}
.comments {
  .wenzi1 {
    border-left: 5px solid deeppink;
    margin: 100rpx 40rpx 60rpx 40rpx;
    font-size: 40rpx;
  }

  .userComment {
    position: relative;
    padding: 50rpx;
    .commentImg {
      height: 100rpx;
      width: 100rpx;
      border-radius: 50%;
    }
    .commentName {
      margin-top: 10rpx;
      font-size: 24rpx;
      opacity: 0.7;
    }

    .commentContent {
      position: absolute;
      left: 300rpx;
      top: 80rpx;
      font-size: 34rpx;
      opacity: 0.5;
    }
  }
}
.noComment {
  margin: 100rpx;
  text-align: center;
}
.xiazai {
  height: 100rpx;
  width: 100%;
  line-height: 100rpx;
  text-align: center;
  background-color: deeppink;
  color: white;
  position: fixed;
  bottom: 0;
}
</style>