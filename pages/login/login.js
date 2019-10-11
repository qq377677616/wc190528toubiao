// pages/login/login.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLoading: false,
        url: '',
        active: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    getUserInfo: function (e) {
        // console.log(e)
        let _this = this;
        wx.login({
            success: res => {
                //向后台索取openID
                app._request_get('ask.php/getCode', {
                    code: res.code
                }, function (success) {
                    console.log(success)

                    // 记录token user_id
                    wx.setStorageSync('openid', success.data.open_session.openid);
                    // 向后台发送用户信息
                    app._request_post('ask.php/getInfo', {
                        nickname: e.detail.userInfo.nickName,
                        avatarurl: e.detail.userInfo.avatarUrl,
                        openid: success.data.open_session.openid,
                        sex: e.detail.userInfo.gender
                    }, (res) => {
                        wx.getLocation({
                            success(res) {
                                // 跳转回原页面
                                wx.navigateBack();
                            }
                        });
                        // console.log(e.detail.userInfo)
                        app.globalData.userInfo = e.detail.userInfo;
                        wx.setStorageSync('userInfo', e.detail.userInfo);
                        _this.setData({
                            isLoading: true
                        })
                        setTimeout(function () {
                            _this.setData({
                                active: 'active'
                            })
                        }, 200)

                    })
                })
            }
        })
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