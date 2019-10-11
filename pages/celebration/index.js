// pages/celebration/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      app.login(() => {
        this.getActivityList();
      });
  },
  getActivityList(){
    const openid = wx.getStorageSync('openid')
    app._request_post('api.php?a=activity_list',{openid:openid},(res)=>{

      if (res.status === 200){
        console.log(res.data)
        this.setData({
          dataList:res.data
        })
      }
    })
  },
  handReceive(e){
    const {id, status, index} = e.currentTarget.dataset
    const openid = wx.getStorageSync('openid')
    let { dataList } = this.data

    if (status){
      this.publicToast('您已领取')
      return
    }

    app._request_post('api.php?a=get_activity_energy',{openid:openid,activity_id:id},(res)=>{
      console.log(res)
      if (res.status === 200){
        dataList[index].status = 1
        this.setData({
          dataList:dataList
        })
      }
    })
  },

  publicToast(text){
    wx.showToast({
      title: text,
      duration: 2000,
      icon:"none"
    });
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
