//app.js
App({
    globalData: {
        userInfo: null,
        awardsConfig: {},
        runDegs: 0,
        energy: 0,
        grade: 0,
        activeProgress: []
    },
    api_root: null,
    infoSources: [{
        name: '全国公共资源中心',
        id: '1'
    }, {
        name: '北京市公共资源中心',
        id: '2'
    }, {
        name: '其他网站(5级以上用户开放))',
        id: '4'
    }],
    firstData: [
        {
            "regid": "1",
            "parid": "1",
            "regname": "北京",
            "type": "1"
        },
        {
            "regid": "2",
            "parid": "1",
            "regname": "河北",
            "type": "1"
        },
        {
            "regid": "3",
            "parid": "1",
            "regname": "吉林",
            "type": "1"
        },
        {
            "regid": "4",
            "parid": "1",
            "regname": "黑龙江",
            "type": "1"
        },
        {
            "regid": "5",
            "parid": "1",
            "regname": "浙江",
            "type": "1"
        },
        {
            "regid": "6",
            "parid": "1",
            "regname": "江西",
            "type": "1"
        },
        {
            "regid": "7",
            "parid": "1",
            "regname": "河南",
            "type": "1"
        },
        {
            "regid": "8",
            "parid": "1",
            "regname": "湖北",
            "type": "1"
        },
        {
            "regid": "9",
            "parid": "1",
            "regname": "湖南",
            "type": "1"
        },
        {
            "regid": "10",
            "parid": "1",
            "regname": "海南",
            "type": "1"
        },
        {
            "regid": "11",
            "parid": "1",
            "regname": "贵州",
            "type": "1"
        },
        {
            "regid": "12",
            "parid": "1",
            "regname": "陕西",
            "type": "2"
        },
        {
            "regid": "13",
            "parid": "1",
            "regname": "西藏",
            "type": "1"
        },
        {
            "regid": "14",
            "parid": "1",
            "regname": "云南",
            "type": "1"
        },
        {
            "regid": "15",
            "parid": "1",
            "regname": "内蒙古",
            "type": "1"
        },
        {
            "regid": "16",
            "parid": "1",
            "regname": "广西",
            "type": "1"
        },
        {
            "regid": "17",
            "parid": "1",
            "regname": "广东",
            "type": "2"
        }
    ],
    secondData: [
        {
            "regid": "1-1",
            "parid": "1",
            "regname": "全部",
            "type": "par"
        },
        {
            "regid": "2-1",
            "parid": "2",
            "regname": "全部",
            "type": "par"
        },
        {
            "regid": "3-1",
            "parid": "3",
            "regname": "全部",
            "type": "par"
        },
        {
            "regid": "4-1",
            "parid": "4",
            "regname": "全部",
            "type": "par"
        },
        {
            "regid": "5-1",
            "parid": "5",
            "regname": "全部",
            "type": "par"
        },
        {
            "regid": "6-1",
            "parid": "6",
            "regname": "全部",
            "type": "par"
        },
        {
            "regid": "7-1",
            "parid": "7",
            "regname": "全部",
            "type": "par"
        },
        {
            "regid": "8-1",
            "parid": "8",
            "regname": "全部",
            "type": "par"
        },
        {
            "regid": "9-1",
            "parid": "9",
            "regname": "全部",
            "type": "par"
        },
        {
            "regid": "10-1",
            "parid": "10",
            "regname": "全部",
            "type": "par"
        },
        {
            "regid": "11-1",
            "parid": "11",
            "regname": "全部",
            "type": "par"
        },
        {
            "regid": "12-1",
            "parid": "12",
            "regname": "全部",
            "type": "par"
        },
        {
            "regid": "21",
            "parid": "12",
            "regname": "西安",
            "type": "cid"
        },
        {
            "regid": "13-1",
            "parid": "13",
            "regname": "全部",
            "type": "par"
        },
        {
            "regid": "14-1",
            "parid": "14",
            "regname": "全部",
            "type": "par"
        },
        {
            "regid": "15-1",
            "parid": "15",
            "regname": "全部",
            "type": "par"
        },
        {
            "regid": "16-1",
            "parid": "16",
            "regname": "全部",
            "type": "par"
        },
        {
            "regid": "20",
            "parid": "17",
            "regname": "广州",
            "type": "cid"
        },
        {
            "regid": "17",
            "parid": "17",
            "regname": "东莞",
            "type": "cid"
        },
        {
            "regid": "18",
            "parid": "17",
            "regname": "佛山",
            "type": "cid"
        },
        {
            "regid": "19",
            "parid": "17",
            "regname": "深圳",
            "type": "cid"
        }
    ],
    onLaunch: function () {

        // console.log('onLaunch');
        this.api_root = 'https://game.flyh5.cn/game/wxca41b21afb51c223/ly_zhuaqu/';
        this._request_get('api.php?a=get_energy_config',{},(res)=>{
            this.globalData.energyConfig = res.data
            console.log(this.globalData.energyConfig)
        })
        // 登录
        // wx.login({
        //     success: res => {
        //         // console.log(res)
        //         // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //     }
        // });
        // 获取用户信息
        //
        // wx.getSetting({
        //     success: res => {
                // console.log(wx.getStorageSync('openid'), res.authSetting['scope.userInfo'])
            if (wx.getStorageSync('openid').length>0) {
                // console.log('xxxxxxxx')
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                // wx.getUserInfo({
                //     success: res => {
                //         console.log(wx.getStorageSync('openid'))
                //         // 可以将 res 发送给后台解码出 unionId
                //         this.globalData.userInfo = res.userInfo
                //
                //         // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                //         // 所以此处加入 callback 以防止这种情况
                //         if (this.userInfoReadyCallback) {
                //             this.userInfoReadyCallback(res)
                //         }
                //     }
                // })
            } else {
                // console.log('hello')
                // wx.redirectTo({
                //     url: '/pages/set/set',
                // });
                // console.log('xx1111')
            }
            // }
        // })
    },
    onShareAppMessage() {
        return {
            imageUrl: '../../image/fen.png'
        }
    },
    setOpenId(id) {
        return Math.random().toString().slice(-10) + wx.getStorageSync('openid') + Math.random().toString().slice(-8)
    },
    /**
     * post提交
     */
    _request_post: function (url, data, success, fail, complete) {
        wx.showNavigationBarLoading();
        let App = this;
        // data.openid = App.setOpenId();
        data.openid = wx.getStorageSync('openid');
        wx.request({
            url: App.api_root + url,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
            data: data,
            success: function (res) {
                if (res.statusCode !== 200 || typeof res.data !== 'object') {
                    console.log('网络请求出错');
                    return false;
                }
                if (res.data.code === -1) {
                    // 登录态失效, 重新登录
                    App.doLogin(function () {
                        App._post_form(url, data, success, fail);
                    });
                    return false;
                } else if (res.data.code === 0) {
                    console.log(res.data.msg, function () {
                        fail && fail(res);
                    });
                    return false;
                }
                success && success(res.data);
            },
            fail: function (res) {
                App.showError(res.errMsg, function () {
                    fail && fail(res);
                });
            },
            complete: function (res) {
                // wx.hideLoading();
                wx.hideNavigationBarLoading();
                complete && complete(res);
            }
        });
    },
    /**
     * get提交
     */
    _request_get: function (url, data, success, fail, complete) {
        wx.showNavigationBarLoading();
        let App = this;
        wx.request({
            url: App.api_root + url,
            method: 'GET',
            data: data,
            success: function (res) {
                if (res.statusCode !== 200 || typeof res.data !== 'object') {
                    console.log('网络请求出错');
                    return false;
                }
                if (res.data.code === -1) {
                    // 登录态失效, 重新登录
                    App.doLogin(function () {
                        App._post_form(url, data, success, fail);
                    });
                    return false;
                } else if (res.data.code === 0) {
                    App.showError(res.data.msg, function () {
                        fail && fail(res);
                    });
                    return false;
                }
                success && success(res.data);
            },
            fail: function (res) {
                App.showError(res.errMsg, function () {
                    fail && fail(res);
                });
            },
            complete: function (res) {
                // wx.hideLoading();
                wx.hideNavigationBarLoading();
                complete && complete(res);
            }
        });
    },
    globalData: {
        userInfo: null
    }
})


//  "sitemapLocation": "sitemap.json"
