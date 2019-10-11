// pages/newsList/newsList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    type:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const self = this;
    self.setData({
      type:options.type
    })
    if(options.type == 'message') {
      app._request_post('api.php?a=list_energy', {
      }, function (success) {
        if(success.status == 200) {
          for(let i =0;i<success.data.length;i++) {
            success.data[i].days = `${success.data[i].days.substring(0, 4)}年${success.data[i].days.substring(4, 6)}月${success.data[i].days.substring(6, 8)}日`
          }
          self.setData({
            list: success.data.reverse()
          })
        }
      })
    } else if (options.type == 'reword'){
      // 获取抽奖记录
      app._request_post('api.php?a=list_luckdraw',{
      },function(success){
        if(success.status == 200) {
          self.setData({
            list: success.data
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