
Page({
  request: function(detail) {
    var that = this
    setTimeout(function() {

      var records = []
      for (var i = 0; i < 20; i++) {
        records.push(i)
      }
      that.setData({
        records: records
      })

      detail.success()
    }, 1000)
  },

  refresh({
    detail
  }) {
    this.request(detail)
  },

  loadMore({
    detail
  }) {

  },
  /**
   * 页面的初始数据
   */
  data: {
    title: '课程',
    height: wx.getSystemInfoSync().screenHeight,
    records: [],
    isAllLoaded: false, //数据是否加载完成
  },

  onLoad: function() {

  }
})