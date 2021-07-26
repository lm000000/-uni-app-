<template>
  <view>
     因为接口失效  获取不到音频数据 故用网络音频代替实现音频下载功能
    <video src="https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4"></video>
    <view class="video" @click="videoClick">下载视频</view>
  </view>
</template>

<script>
export default {
    methods:{
      videoClick(){
        uni.downloadFile({
          url:"https://v-cdn.zjol.com.cn/276989.mp4",
          success:(res)=>{
            /* 将音频保存到本地 */
             uni.saveVideoToPhotosAlbum({
               filePath:res.tempFilePath,
               success:res=>{
                 console.log("成功")
               }
             })
          }
        })
      }
    }
}
</script>

<style>
video{
  width:100%
}
.video{
  width:100%;
  background-color: deeppink;
  color:white;
  text-align:center;
  height:100rpx;
  line-height:100rpx;
}
</style>