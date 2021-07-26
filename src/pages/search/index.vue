<template>
  <view>
    <view class="wai">
      <view class="sousuo">
        <input
          type="text"
          placeholder="请输入你要搜索的内容"
          @input="inputChange"
          @click="inputClick"
          v-model="value"
          name="text"
          key="text"
        />
        <view class="iconfont icon-sousuo" @click="spanClick"></view>
      </view>
    </view>
    <scroll-view class="content" scroll-y="true" v-show="flag">
      <navigator
        v-for="(item, index) in data"
        :key="index"
        :url="`/pages/categoryImg/index?id=${item.id}`"
      >
        {{ item.name }}
      </navigator>
    </scroll-view>
    <scroll-view class="content" scroll-y="true" v-show="flag2">
      <navigator
        v-for="(item, index) in pipeiData"
        :key="index"
        :url="`/pages/categoryImg/index?id=${item.id}`"
      >
        {{ item.name }}
      </navigator>
    </scroll-view>
    <view class="bottom" @click="viewclick"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      data: Array,
      flag: false,
      pipeiData: [],
      value: "",
      flag2: false,
    };
  },
  mounted() {
    this.request({
      url: "http://service.picasso.adesk.com/v1/vertical/category",
    }).then((res) => {
      this.data = res.res.category;
      console.log(this.data);
    });
  },
  methods: {
    viewclick() {
      this.flag = false;
      this.flag2 = false;
      this.value = "";
    },
    inputClick() {
      if (this.flag2 != true) {
        this.flag = true;
      }
    },
    inputChange() {
      this.flag = false;
      this.flag2 = true;
      setTimeout(() => {
        let reg = new RegExp(this.value, "g");
        for (let i of this.data) {
          if (reg.test(i.name) && this.value != "") {
            this.pipeiData.push(i);
          }
        }
        if (this.value === "") {
          this.flag = true;
          this.flag2 = false;
          this.pipeiData = [];
        }
      }, 500);
    },
    spanClick() {
        let reg = new RegExp(this.value, "g")
        for (let i of this.data) {
          if (reg.test(i.name) && this.value != "") {
            uni.navigateTo({
              url:`/pages/categoryImg/index?id=${i.id}`
            })
            }else{
           uni.showToast({
              title:"搜索不到",
              icon:"error"
         })
         setTimeout(()=>{
           uni.hideToast()
         },1000)
        
            }

        }
    }
  }
}
</script>

<style lang="scss">
.bottom {
  height: 550rpx;
}
navigator:hover {
  background-color: orange;
}
.wai {
  width: 100%;
  background-color: chartreuse;
  height: 80rpx;
}
.content {
  padding: 20rpx;
  height: 400rpx;
  border: 2rpx solid black;
  navigator {
    height: 60rpx;
    line-height: 60rpx;
  }
}
.sousuo {
  padding: 20rpx;
  margin: 0 auto;
  position: relative;
  view {
    position: absolute;
    top: 22rpx;
    right: 85rpx;
  }
}
input {
  border: 2rpx solid black;
  display: inline-block;
  width: 80%;
}
</style>