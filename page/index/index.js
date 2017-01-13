var app = getApp();
page({
	data:{
		text:"我是主页菌"
	},
	 bindFocus:function(){
        wx.navigateTo({
        url: './search/search'
      })
    }
})