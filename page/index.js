Page({
  data: {
    list: [
      {
        id: 'index',
        name: '主页菌',
        pages:['index']
      },
       {
        id: 'list',
        name: '列表菌',
        pages:['index']
      }
    ]
  },
  widgetsToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      list: list
    });
  }
});
