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
    productList:[],
    isPriceUp:false, // 价格从大到小？ 默认是从小到大
    updateSize:8,
    forTest:0,
    prodScale:0.25,  // 宽是整个拍屏幕宽度的0.25
    systemInfo:{},
    navbarHeight:39,
    selectHeight:51
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
      
      wx.showToast({
        title: '努力请求中~',
        icon: 'loading',
        duration: 2000,
        mask:true
      })
      
      var tmpArr = this.getProductList(0);
      this.setData({
        isShowResult:true,
        productList:tmpArr
      })
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
      var that = this;
      wx.getSystemInfo({
        success: function(res) {
          that.setData({
            systemInfo:res
          })
        }
      })
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
    if(e.currentTarget.dataset.idx == 2){
        var tmp = this.data.isPriceUp;    
        this.setData({
          currentNavbar: e.currentTarget.dataset.idx,
          isPriceUp: !tmp
        })
        var tmpArr = this.getProductList(e.currentTarget.dataset.idx);
        this.setData({
          productList:tmpArr
        })
    }else if(this.data.currentNavbar!=e.currentTarget.dataset.idx){
        this.setData({
          currentNavbar: e.currentTarget.dataset.idx,
          isPriceUp:false
        })
        var tmpArr = this.getProductList(e.currentTarget.dataset.idx);
         this.setData({
          productList:tmpArr
        })
    }else{
        console.log('没什么变化，不需要更新');
    }
  },
  /**
   * [getProductList 仅仅是用来获取数据，不做更新处理]
   * @param  {[type]} idx [description]
   * @return {[type]}     [description]
   */
  getProductList:function(idx){
      wx.showNavigationBarLoading();
      // 根据idx以及isPriceUp来判断请求哪一种数据, 参数包括 inputvalue updateSize productList.length isPriceUp,idx
      var index = ++this.data.forTest;
      var tmpArr = [
        {
          name: index+'水电费水电费是胜多负少',
          url:'http://f.p.cycangcdn.com/supplier/1467687105197.jpg',
          price:2323,
          id:'121323'
        },
        {
          name: index+'发生地方是对方身份',
          url:'http://f.p.cycangcdn.com/supplier/1467687105197.jpg',
          price:2323,
          id:'121323',
        },
        {
          name:index+'是对方身份',
          url:'http://f.p.cycangcdn.com/supplier/1467687105197.jpg',
          price:2323,
          id:'121323'
        },
        {
          name:index+'发广告的风格的风格',
          url:'http://f.p.cycangcdn.com/supplier/1467687105197.jpg',
          price:2323,
          id:'121323'
        },
        {
          name: index+'水电费水电费是胜多负少',
          url:'http://f.p.cycangcdn.com/supplier/1467687105197.jpg',
          price:2323,
          id:'121323'
        },
        {
          name: index+'发生地方是对方身份',
          url:'http://f.p.cycangcdn.com/supplier/1467687105197.jpg',
          price:2323,
          id:'121323',
        },
        {
          name:index+'是对方身份',
          url:'http://f.p.cycangcdn.com/supplier/1467687105197.jpg',
          price:2323,
          id:'121323'
        },
        {
          name:index+'发广告的风格的风格',
          url:'http://f.p.cycangcdn.com/supplier/1467687105197.jpg',
          price:2323,
          id:'121323'
        }
      ];
      this.setData({
        forTest:index
      })
      // 数据回来的时候关闭加载
      wx.hideNavigationBarLoading();
      return tmpArr;
  },
  pullUpLoad:function(){
    // 下拉加载
    console.log(11111);
    var tmpArr = this.getProductList(this.data.currentNavbar);
    console.log(tmpArr);
    var tmpArr2 = this.data.productList;
    console.log(tmpArr2)
    var sliceArr = tmpArr2.concat(tmpArr);
    console.log(sliceArr);
    this.setData({
      productList:sliceArr
    })
  }
})