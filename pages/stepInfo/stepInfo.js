// pages/stepInfo/stepInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    i_modal:false,
    actions3: [
      {
        name: '取消'
      },
      {
        name: '确定',
        color: 'red'
      },
    ],
    info:[],
    date:'',
    deleteIndex:null,
  },
  handleClick({detail}){
    console.log(detail)
    switch (detail.index) {
      case 0:
        this.setData({
          i_modal:false
        });
        break;
      case 1:
        app._request_post('api.php?a=del_course',{nid:this.data.deleteIndex.id,openid:wx.getStorageSync('openid')},(res)=>{
          if (res.meg === '删除成功'){
            let self = this
            //关闭弹窗 删除
            this.setData({
              i_modal:false,
              info:self.data.info.splice(self.data.deleteIndex.index, 1)
            });
            wx.showToast({
              title: '删除成功',
            })
          }
        });
        break

    }

  },
  handDelete(e){
    // console.log(e)
    this.setData({
      deleteIndex:{index:e.currentTarget.dataset.index, id:e.currentTarget.dataset.id},
      i_modal:true,
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
      app.login(() => {
        app._request_post('api.php?a=total',{},function(success){
        if(success.status == 200) {
            self.setData({
            info:success.num,
            date: self.setDate()
            })
        }
        })
      });
  },
  setDate(){
    const year = new Date().getFullYear();
    const mon = new Date().getMonth() +1;
    const date = new Date().getDate();
    return `${year}年${mon}月${date}日`;
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