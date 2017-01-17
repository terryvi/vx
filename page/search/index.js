var app = getApp()
Page({
  data: {
    selectHide:false,
    inputValue:'',
    getSearch:[],
    modalHidden:true,
    hotSearch:[],
    isSearch:false,
    isShowResult:false,
    navbar: ['综合', '销量', '价格'],
    currentNavbar: '0',
  },
  bindInput:function(e){
     this.setData({
       inputValue:e.detail.value,
       isSearch: e.detail.value?true:false
     });
      // 目前不做下拉框类似关键字这样的东西先。
  },
  /**
   * [setSearchStorage 点击搜索按钮]
   * 先把搜索词放进本地缓存中，然后进入搜索结果页
   */
  setSearchStorage:function(){
    var data;
    var localStorageValue = [];
    if(this.data.inputValue != ''){
      //调用API从本地缓存中获取数据
      var searchData = wx.getStorageSync('searchData') || []
      searchData.push(this.data.inputValue)
      wx.setStorageSync('searchData', searchData)
      // wx.navigateTo({
      //     url: '../result/result?searchWord='+this.data.inputValue
      // })
      this.setData({
        isShowResult:true
      })
      wx.showToast({
        title: '努力请求中~',
        icon: 'loading',
        duration: 2000,
        mask:true
      })
      // console.log('马上就要跳转了！')
    }else{
      console.log('空白的你搜个jb')
    }
    // this.onLoad();
  },
  modalChangeConfirm:function(){
      wx.setStorageSync('searchData',[])
      this.setData({
        modalHidden:true,
        getSearch:[]
      })
      // wx.redirectTo({
      //   url: '../search/search'
      // })
      // this.onLoad();
      
  },
  modalChangeCancel:function(){
      this.setData({
        modalHidden:true
      })
  },
  clearSearchStorage:function(){
    this.setData({
        modalHidden:false
    })

    // this.onLoad();
  },
  onLoad:function(){
      console.log(this.data.getSearch);
  },
  onShow:function(){
    // var getSearch = wx.getStorageSync('searchData');
    var getSearch = ['我鼎折覆餗','胜多负少','防守打法','fsdfds','sdfsdf dfsf水电费水电费','是范德萨发'];
    var hotSearch = ['xxxxx','fsdfs','fsdfsf','你妈嗨','h1z1','神灵武士','幻影刺客','敌法师']
    this.setData({
      getSearch:getSearch,
      hotSearch:hotSearch,
      inputValue:''
    })

    console.log('search is onshow')
  },
  onHide:function(){
    console.log('search is onHide')
    wx.redirectTo({
        url: '../search/search'
    })
  },
  bindchange:function(e){
    console.log('bindchange');

  },
  clearInput:function(){
    this.setData({
       inputValue:'',
       isSearch:false
     })
  },
  backToIndex:function(){
    // 文档里边说过tabbar的页面不能直接用 navigateTo这样
    wx.switchTab({
        url: '../index/index'
    })
  },
  switchNav: function(e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    })
    wx.showNavigationBarLoading();
    // 本来应该是发送请求去服务端的，现在就本地的来
  }
})