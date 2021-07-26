export default (params)=>{  
   uni.showLoading({      //请求时加载
      title: "加载中"  
  }) 
  return new Promise((resolve,reject)=>{
    wx.request({
        ...params,
        success(res){
          resolve(res.data)
        },
         complete(){       //不管是成功还是失败都会执行这个     
         uni.hideLoading();   
        } 
    })
  })
}