<template>
  <view>
    <view class="zhuce">
     <view class=view1>登录</view>
     <view class="view2">注册</view>
    </view>
    <view class="bottom">
      <view><image src="~@/static/icon/_home.png"><span>首页</span></view>
      <view><image src="~@/static/icon/_img.png"><span>横屏</span></view>
      <view><image src="~@/static/icon/_search.png"><span>搜索</span></view>
      <view><image src="~@/static/icon/_videocamera.png"><span>音频</span></view>
      <view><image src="~@/static/icon/_my.png"><span>我的</span></view>
    </view>
  </view>
</template>

<script>
  export default {

  }
</script>

<style scoped>
   .zhuce{
     height: 100px;
     width: 100%;
     background: #ff5777;   
     display: flex;
   }
   .view1{
      width: 50%;
      border-right: 1px solid black;
       height: 100px;
       line-height: 100px;
       text-align: center;
       font-size:26px;
       color: white;
   }
   .view2{
      width: 49%;
       height: 100px;
        line-height: 100px;
       text-align: center;
       font-size:26px;
         color: white;
   }
  .bottom::before{
    content: "";
    width: 100%;
    height: 5px;
    background: #cccccc;
    position: absolute;
    top:-5px;
    left: 0;
  }
  .bottom{
    width: 100%;
    padding: 20px;
    position: relative;
  }
  .bottom image{
    width: 30px;
    height: 30px;
    margin-right: 15px;
  }
  .bottom view{
    margin-bottom: 20px;
    height:40px ;
    line-height: 40px;
  }
  .bottom span{
    position: relative;
    top:-10px
  }
</style>
