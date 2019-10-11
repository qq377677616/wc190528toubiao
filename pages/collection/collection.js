// pages/collection/collection.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAll:false,
    isEdit:false,
    editVal:'编辑',
    collectData:[],
    date:'',
    activeArr:[]
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前年月日
    this.setData({
      date:this.setDate(),
      isEdit:false,
      editVal: '编辑',
      activeArr:[],
      isAll: false,
    })

    const self = this;
        // 获取收藏数据
    app.login(() => {
        app._request_post('api.php?a=collection_list',{},function(success){
            if(success.status == 200) {
                const data = success.data;
                self.setData({
                collectData: data
                })
                // TODO 按时间类型归类
            }
        })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  goDetails(e) {
    console.log(e)
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../details/details?id=' + id
    })
  },
  setDate(){
    var today = new Date();//获得当前日期
    var year = today.getFullYear();//获得年份
    var month = this.p(today.getMonth() + 1);//此方法获得的月份是从0---11，所以要加1才是当前月份
    var day = this.p(today.getDate());//获得当前日期
    console.log(year+'-'+month+'-'+day)
    return year + '-' + month + '-' + day;
  },
  p(s) {
    return s < 10 ? '0' + s : s;
  },
  deleteCollection(){
    const data = this.data.activeArr;
    const ids = [];

  },
  deleteCollection(){
    const self =this;
    const data = this.data.activeArr;
    const ids = [];
    if (data.length <= 0) {
      wx.showToast({
        title: '没有选择信息',
        icon: 'none',
        duration: 2000
      })
      return
    } else {
      for(let i =0;i<data.length;i++) {
        ids.push(data[i].id)
      }
    }
    // 取消收藏
    app._request_post('api.php?a=del_collection', {
      // id: ids
      id: ids.join(',')
    }, function (success) {
      if(success.status == 200) {
        wx.showToast({
          title: '取消收藏成功',
          icon: 'success',
          duration: 2000
        })
        self.onLoad();
      }
    })
  },
  checkLine(e){
    const id = e.currentTarget.dataset.id;
    const status = e.currentTarget.dataset.station;
    const copy = this.data.collectData;
    const data = this.data.collectData[e.currentTarget.dataset.key]
    
    for(let i =0;i<data.length;i++){
      if(data[i].id == id && !status) {
        data[i].isChecked = true;
      } else if (data[i].id == id && status){
        data[i].isChecked = false;
      }
    }
    copy[e.currentTarget.dataset.key] = data;
    this.setData({
      collectData:copy
    })
    this.setActive();
  },
  checkAll() {
    const data = this.data.collectData;
    for(let i in data) {
      for (let v = 0; v < data[i].length;v++) {
        if(this.data.isAll){
          data[i][v].isChecked = false;
        } else {
          data[i][v].isChecked = true;
        }
      }
    }
    this.setData({
      isAll: !this.data.isAll,
      collectData:data,
    })
    this.setActive();
  },
  edit() {
    this.setData({
      isEdit: !this.data.isEdit
    })
    if(this.data.isEdit) {
      this.setData({
        editVal:'取消'
      })
    } else {
      this.setTotal();
      this.setActive();
      this.setData({
        editVal: '编辑'
      })
      
    }
  },
  setTotal(){
    const data = this.data.collectData;
    for (let i in data) {
      for (let v = 0; v < data[i].length; v++) {
          data[i][v].isChecked = false;
      }
    }
    this.setData({
      collectData: data,
      isAll:false,
      activeArr:[]
    })
  },
  setActive(){
    const arr = [];
    const data = this.data.collectData;
    for (let i in data) {
      for (let v = 0; v < data[i].length; v++) {
        if (data[i][v].isChecked){
          arr.push(data[i][v])
        }
      }
    }
    if(arr.length == this.getLength()) {
      this.setData({
        isAll: true
      })
    } else {
      this.setData({
        isAll: false
      })
    }
    this.setData({
      activeArr:arr
    })
  },
  getLength(){
    let len = 0;
    const data = this.data.collectData;
    for (let i in data) {
      len += data[i].length;
    }
    return len;
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