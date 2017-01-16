// var app = getApp();
Page({
	data:{
		text:"我是主页菌"
	},
	 bindFocus:function(){
        wx.navigateTo({
        url: '../search/index'
      })
    }
})