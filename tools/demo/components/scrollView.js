// component/scrollView/scrollView.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // scrollView滚动范围
    scrollHeight: {
      type: Number,
      value: 0
    },
    // 数据是否加载完成
    isAllLoaded: {
      type: Boolean,
      value: false
    },
    // 是否加载
    isLoadingHeader: {
      type: Boolean,
      value: false,
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollTop: 0, // 是否在顶部
    touchStartY: 0, // 触摸的起始位置
    isLoadingHeader: false,
    isLoadingFooter: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    startRefresh: function() {
      this.setData({
        isLoadingHeader: true
      })
      this.refresh()
    },

    /**
     * 下拉刷新
     */
    refresh(e) {
      var that = this
      this.triggerEvent('refresh', {
        success: () => {
          setTimeout(() => {
            that.setData({
              isLoadingHeader: false
            })
          }, 400)
        }
      })
    },

    /**
     * 上拉加载
     */
    loadMore(e) {
      if (this.data.isAllLoaded) {
        return
      }
      if (this.data.isLoadingFooter) {
        return
      }
      this.setData({
        isLoadingFooter: true
      })
      var that = this
      this.triggerEvent('loadMore', {
        success: () => {
          setTimeout(() => {
            that.setData({
              isLoadingFooter: false
            })
          }, 400)
        }
      })
    },

    scroll(e) {
      this.setData({
        scrollTop: e.detail.scrollTop
      })
    },

    touchStart(e) {
      this.setData({
        touchStartY: e.touches[0].pageY
      })
    },

    touchMove(e) {

    },

    touchEnd(e) {
      if (this.data.scrollTop <= 0) {
        let height = e.changedTouches[0].pageY - this.data.touchStartY;
        // 下拉超过80显示下拉刷新
        if (height >= 80) {
          if (this.data.isLoadingHeader) {
            return
          }
          console.log('刷新中...')
          this.setData({
            isLoadingHeader: true
          })
          this.refresh()
        }
      }
    },
  }
})