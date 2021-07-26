<template>
  <view @click="viewClick">
      <slot></slot>
  </view>
</template>

<script>
export default {
    props:{  
        list:Array,
        index:Number
    },
    methods:{
        viewClick(){
            getApp().globalData.globalList=this.list
            getApp().globalData.globalIndex=this.index
            uni.navigateTo({
                url:"/pages/imgDetail/index"
            })
           
        }
    }
}
</script>

<style>

</style>