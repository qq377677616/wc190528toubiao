// pages/details/details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    title:'',
    time:'',
    content:'',
    link:'',
    collectVal:'收藏'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id:options.id
    });
    // 获取详情内容
    const self = this;
      app.login(() => {
          app._request_post('api.php?a=content', {
              id: options.id
          }, function (success) {
              if (success.status == 200) {
                  self.setData({
                      title: success.data.title,
                      time: success.data.date,
                      content: success.data.content,
                      link: success.data.link,
                      collectVal: '收藏'
                  })
              } else if (success.status == 201) {
                  self.setData({
                      title: success.data.title,
                      time: success.data.date,
                      content: success.data.content,
                      link: success.data.link,
                      collectVal: '取消收藏'
                  })
              }
          })
      });
  },
  // 收藏
  collect(){
    const self = this;
    if(self.data.collectVal == '收藏'){
      app._request_post('api.php?a=collection', {
        id:self.data.id
      },function(success){
        if(success.status == 200) {
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 2000
          })
          self.setData({
            collectVal: '取消收藏'
          })
        } else if(success.status == 401){
          wx.showToast({
            title: '已收藏',
            icon: 'none',
            duration: 2000
          })
        }
      })
    } else if (self.data.collectVal == '取消收藏') {
      app._request_post('api.php?a=del_collection', {
        id: self.data.id
      }, function (success) {
        if (success.status == 200) {
          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 2000
          })
          self.setData({
            collectVal: '收藏'
          })
        } 
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  copyText: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.url,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '地址复制成功'
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})