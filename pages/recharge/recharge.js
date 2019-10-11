// pages/recharge/recharge.js
function accMul(num1,num2) {
    let m = 0,s1 = num1.toString(), s2 = num2.toString()
    try{ m += s1.split(".")[1].length}catch(e){}
    try{ m += s2.split(".")[1].length}catch(e){}
    let num = Number(s1.replace(".","")) * Number(s2.replace(".","")) / Math.pow(10,m)
    // console.log(num)
    return num
}
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        actions3: [
            {
                name: '取消'
            },
            {
                name: '微信支付',
                color: '#19be6b'
            },

        ],
        value1: 1,
        zmoney: 0,
        activeData: {},
        visible3: false,
        data: [
            {id: 1, money: 1, energy: 10, acMoney: 0},
            {id: 1, money: 5, energy: 50, acMoney: 0},
            {id: 1, money: 10, energy: 100, acMoney: 0},
        ],
        can: false,
        discount: [],
        activeDiscount:null,
        url: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */

    onLoad: function (options) {
        let videoAd = null;
        // if (wx.createRewardedVideoAd) {
        //     videoAd = wx.createRewardedVideoAd({adUnitId: 'adunit-e023e67cd97be3f3'})
        // }
        const self = this;

        app._request_post('api.php?a=get_recharge', {},  (res) =>{
            console.log('xxxx', res.data)
            if (res.status == 200) {
                this.setData({
                    discount: res.data
                })
            }
        })
        // 查询充值资格
        // app._request_post('api.php?a=is_recharge', {}, function (success) {
        //     if (success.status == 200) {
        //         // 查询折扣
        //     }
        // })
        // 查询能量配置
        // app._request_post('api.php?a=set_recharge', {}, function (success) {
        //   if (success.status == 200) {
        //     self.setData({
        //       data: success.data
        //     })
        //   }
        //   console.log(self.data.data)
        // })

        // 查询广告图
        app._request_post('api.php?a=query_ad', {}, function (success) {
            if (success.status == 200) {
                self.setData({
                    url: success.data.img
                })
            }
        })
    },
    compute(energy) {
        let value;
        if (energy < 50) {
            value = energy / this.data.discount[0].energy * this.data.discount[0].money * this.data.discount[0].discount
        } else if (energy >= 50 && energy < 100) {
            value = energy / this.data.discount[1].energy * this.data.discount[1].money * this.data.discount[1].discount
        } else {
            value = energy / this.data.discount[2].energy * this.data.discount[2].money * this.data.discount[2].discount
        }
        return Math.round(value * 100) / 100
    },
    rechange(e) {
        // console.log(e.currentTarget.dataset.price);
        this.setData({
            value1: 1,
            visible3: true,
            activeDiscount:e.currentTarget.dataset.discount,
            activeData: e.currentTarget.dataset.price,
            zmoney: this.compute(e.currentTarget.dataset.price.energy)
        })

        // const price = e.currentTarget.dataset.price;
        // const arr = [];
        // for (let v of this.data.data) {
        //     if (v.price == price) {
        //         v.active = true;
        //     } else {
        //         v.active = false;
        //     }
        //     arr.push(v)
        // }
        // console.log(arr)
        // this.setData({
        //     data: arr
        // })

        // 处理支付
        // const self = this;

    },
    handleChange1({detail}) {
        // console.log(detail)
        let energy = this.compute(this.data.activeData.energy * detail.value)
        // console.log(Math.round(energy * 10) / 10)
        this.setData({
            value1: detail.value,
            zmoney: energy
        })
    },
    cl() {

    },
    handleClick3(e) {
        // console.log(e.detail.index)
        let that = this
        switch (e.detail.index) {
            case 0:
                this.setData({
                    visible3: false
                })
                break;
            case 1:
                let price = this.compute(e.currentTarget.dataset.price)
                console.log('xxx', price)
                app._request_post('ask.php/pay', {
                    openid: wx.getStorageSync('openid'),
                    // TODO对接实付金额
                    order_prise: price,
                    original_price: e.currentTarget.dataset.price
                }, (success) => {
                    console.log(success)
                    const data = JSON.parse(success.data);
                    // console.log(data)
                    wx.requestPayment({
                        'timeStamp': data.timeStamp,
                        'nonceStr': data.nonceStr,
                        'package': data.package,
                        'signType': data.signType,
                        'paySign': data.paySign,
                        'success': function (res) {
                            that.setData({
                                visible3: false
                            })
                            wx.showToast({
                                title: '充值成功',
                                icon: 'success',
                                duration: 2000
                            })
                        }
                    })
                })
                break;
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