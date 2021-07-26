<template>
  <view class="category">
    <navigator class="categoryItem" v-for="(item,index) in data" :key=index
     :url="`/pages/categoryImg/index?id=${item.id}`"
    >
      <image mode="aspectFill" :src="item.cover"> 
      </image>
      <view class="categoryFont">{{item.name}}</view>
    </navigator>
  </view>
</template>

<script>
export default {
 mounted(){
    uni.setNavigationBarTitle({title:"分类"}),
     this.request({
      url:"http://service.picasso.adesk.com/v1/vertical/category"
    })
    .then(res=>{
      this.data=res.res.category
    })
    .catch(res=>{
    console.log("出错")
  })
  },
  data(){
     return{
       data:[]
     }
  }
}
</script>

<style lang="scss">
.category {
  display: flex;
  flex-wrap: wrap;
 .categoryItem{
   position: relative;
   width:32%;
   height:250rpx;
   border:5rpx solid white;
   overflow:hidden;
   image {
   width:100%;
   }
  .categoryFont {
     position: absolute;
     bottom:0;
     left:10rpx;
     color:white;
    
  }
 }
}
</style>