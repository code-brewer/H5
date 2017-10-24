//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    
  },
  toDetails: function(e) {
  	wx.navigateTo({
  		url: '../details/details?type='+e.target.dataset.index
  	})
  },
  onLoad: function () {
    console.log('onLoad')
    
  }
})
