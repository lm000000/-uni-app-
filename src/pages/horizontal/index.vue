<template>
  <view>
    <view>
   <map style="width: 100%; height: 100vh;" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
    </view>
  </view>
</template>

<script>
export default {
   data(){
     return{
       id:0, // 使用 marker点击事件 需要填写id
            latitude: Number,
            longitude: Number,
            covers: [{
                latitude: Number,
                longitude: Number,
                iconPath: '/static/icon/my.png'
            },
             {
                latitude:Number,
                longitude: Number,
               iconPath: '/static/icon/_home.png'
            }]
        }
   },
   mounted(){
     uni.getLocation({
         type:"gcj02",
      success: res=> {
        this.latitude = res.latitude
        this.longitude = res.longitude
       this.covers.longitude = res.longitude
       this.covers.latitude = res.latitude
    }
     })
   }
}
</script>

<style>
</style>