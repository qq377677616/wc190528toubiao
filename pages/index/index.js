//index.js
//获取应用实例
const app = getApp();
const moment = require('../../utils/moment.min.js');

//时间格式化
function timestampToString(timestamp, type){
    moment.locale('en', {
        longDateFormat: {
            l: "YYYY-MM-DD",
            L: "YYYY-MM-DD HH:mm:ss"
        }
    });
    return moment(timestamp).format(type);
}
// import moment from 'moment';
var videoAd = null;
Page({
    data: {
        isTost:false,
        actionsTost:[
            {
                name:'关闭'
            }
        ],
        listDataLenght:0,
        isCheck: '签到',
        z_modal: true,
        prompt: '尊敬的用户，您好，欢迎使用投标小精灵。投标小精灵致力于为用户提供便捷及时的投标信息。进程功能帮你追踪多个省市实时的招投标信息。收藏功能帮你记录你关注的投标信息。进程每日会消耗能量。每日签到可获得能量。推广新用户可获得能量。进程操作请点击小精灵头像。',
        visible4: false,
        prise: 0.01,
        isLayer: false,
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        userHead: '',
        energy: 0,
        isEnergy:false,
        pre: '0',
        grade: '',
        lineData: [],
        listData: [],
        processList: [],
        activeProcess: 0,
        activeId: 99,
        processIndex: false,
        process: true,
        adNum:1,
        actions3: [
            {
                name: '取消'
            },
            {
                name: '观看广告',
                color: '#ff9900'
            },
        ],
        actions4: [
            {
                name: '微信充值',
                color: '#ff9900'
            },
            {
                name: '观看广告'
            },
          {
            name: '取消'
          }
        ],
    },
    tostClick(){
    //    每日消耗提示
        this.setData({
            isTost:false
        })
    },
    handCheck() {
        if (this.data.isCheck !== '已签到') {
            wx.showLoading({
                title: '加载中',
            })
            app._request_post('api.php?a=sign_in', {openid: wx.getStorageSync('openid')}, (res) => {
                if (res.msg === '签到成功') {
                    this.setData({
                        energy:Number(this.data.energy) + 10,
                        isCheck: '已签到'
                    })
                }
                wx.hideLoading()
            })

        }
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    ad() {

        let that = this
        if (wx.createRewardedVideoAd) {
            videoAd = wx.createRewardedVideoAd({
                adUnitId: 'adunit-e023e67cd97be3f3'
            })
        }
        // console.log(videoAd)

    },
    goCelebration(){

    },
    adReward(status){
        console.log('xxxx',status);
        if (status && status.isEnded || status === undefined) {
            // 正常播放结束，下发奖励
            // console.log('hello')
            if (this.data.adNum > 3){
                console.log(1111)
                this.setData({
                    adNum:1
                })
            }
            let energy = 0;
            switch (this.data.adNum) {
                case 1:
                    energy = 10;
                    break;
                case 2:
                    energy = 20;
                    break;
                case 3:
                    energy = 40;
                    break;
            }
            // console.log(en)
            app._request_post('api.php?a=add_energy', {openid: wx.getStorageSync('openid'),energy:energy}, (res) => {
                console.log('aaaa',res)
                if (res.status === 200){

                    wx.showToast({
                        title: `获取${energy}点能量,连续观看可翻倍奖励`,
                        duration: 2000
                    });

                    // that.setData({
                    //
                    // })
                    // if (!that.data.processIndex) {
                    console.log('bf:',this.data.adNum )
                    this.setData({
                        adNum:this.data.adNum + 1,
                        energy:Number(this.data.energy)+10,
                        // processIndex: true,
                        process: false
                    })
                    console.log('cl:',this.data.adNum )
                    // }

                }else {
                    wx.showToast({
                        title: '服务器错误,稍后重试',
                        icon: 'none',
                        duration: 2000
                    });
                }

                // let arr = this.data.processList;
                // if (this.data.activeProcess !== 0){
                //     if (!arr.includes(this.data.activeProcess)) {
                //         this.setData({
                //             processList:this.data.processList.push(this.data.activeProcess)
                //         })
                //     }
                // }
                // console.log(this.data.processList)
                // wx.showToast({
                //     title: '获取20点能量',
                //     duration: 2000
                // });
            })
        } else {
            wx.showToast({
                title: '中途退出无法检索信息',
                icon: 'none',
                duration: 2000
            });
            // 播放中途退出，进行提示
        }
    },
    handModal(e) {
        if (e.currentTarget.dataset.index !== undefined) {
            wx.setStorageSync('zModal', 1)
        }
        this.setData({
            z_modal: true
        })
    },
    _handleClick({detail}) {
        switch (detail.index) {
            case 0:
                rewardedVideoAd.show()
                break;
            case 1:
                this.setData({
                    process: false
                });
                break;
        }
    },
    handleClick({detail}) {
        // console.log()
        switch (detail.index) {
            case 0:
                wx.navigateTo({
                    url: '/pages/recharge/recharge'
                });
                break;
            case 1:
                if (videoAd) {
                    videoAd.show()
                }
                break;
          case 2:
            this.setData({
                adNum:1,
                isTost:false,
              visible4: false
            })
            break;
        }

    },
    onReady: function () {
        // this.animation = wx.createAnimation()
    },
    onShow: function (options) {
        // console.log(wx.not)
        // 查询用户已有进程

        // console.log(wx.getStorageSync('userInfo'))
        if (wx.getStorageSync('userInfo') !== '') {

            app._request_post('api.php?a=get_unlock', {openid: wx.getStorageSync('openid')}, (success) => {
                let list = []
                // console.log(success.data)
                if (success.data.process.length <= 0) {
                    this.setData({
                        process: false
                    })
                    // list = []
                } else {
                    list = success.data.process.split(',');
                }

                this.setData({
                    listData: list,
                    listDataLenght:list.length
                })
                // console.log()
                // if (this.data.energy >= list.length * 10 ){
                //
                // }

            });
            if (wx.getStorageSync('zModal') !== 1) {
                this.setData({
                    z_modal: false,
                })
            }
            this.setData({

                userHead: wx.getStorageSync('userInfo').avatarUrl
            });

        } else {
            wx.navigateTo({
                url: '/pages/login/login',
            })
        }

        const self = this;

        // 查询用户等级
        app._request_post('api.php?a=grade', {}, function (success) {
            if (success.status === 200) {
                app.globalData.grade = success.data
                self.setData({
                    grade: '../../image/grade' + success.data + '.png'
                })
            }
        });
        // 查询用户能量
        app._request_post('api.php?a=query_energy', {}, function (success) {

            if (success.status === 200) {

                app.globalData.energy = success.data.energy;
                app.globalData.pre = self.GetPercent(success.data.energy, 1000)
                // 计算能量百分比

                self.setData({
                    energy: app.globalData.energy,
                    pre: self.GetPercent(success.data.energy, 1000)
                })
            }
        });

        app._request_post('api.php?a=is_signIn', {openid: wx.getStorageSync('openid')}, (res) => {
            // console.log(res)
            if (res.msg !== '未签到') {
                this.setData({
                    isCheck: '已签到'
                })
            }
        })
        //获取进程详细

        // if (this.data.listDataLenght * 10 >= this.data.energy){

        // }
        app._request_post('api.php?a=date_process', {}, (success) => {
            if (success.status === 400) {
                this.setData({
                    isTost:true,
                    visible4: true
                })
            }else {
                this.getUnlockInfo();
            }
        })
    },
    getUnlockInfo(){
        app._request_post('api.php?a=unlock_info', {
            // page:1
        }, (success) => {

            if (success.status === 200) {

                const data = success.data;
                // console.log(data)
                const arr = [];
                for (let v = 0; v < data.length; v++) {
                    for (let i = 0; i < data[v].length; i++) {
                        data[v][i].index = v + 1;
                        arr.push(data[v][i])
                    }
                }

                this.setData({
                    lineData: arr
                })
            }
        })
    },

    onLoad(options) {
        this.ad();
        videoAd.onLoad(() => {
            console.log('激励视频 广告加载成功')
        })
        videoAd.onError((res) => {
            console.log(res)
        });
        videoAd.onClose((status) => {
            this.adReward(status)
        })
        // console.log()
        // timestampToString(new Date(), 'l')
        // let isTime = wx.getStorageSync('datetime');
        // let nowadays = timestampToString(new Date(), 'l')
        // // console.log()
        // if(false){
        //     if (isTime !== nowadays) {
        //         wx.setStorageSync('datetime',nowadays)
        //         this.setData({
        //             isTost:true
        //         })
        //     }
        // }else {
        //     this.setData({
        //         isTost:true
        //     })
        //     wx.setStorageSync('datetime',nowadays)
        // }

        //查询是否能量充足



        if (JSON.stringify(options) != '{}') {
            // 通过分享链接进入
            app._request_post('api.php?a=get_extend', {
                openid: wx.getStorageSync('openid'),
                id: options.id
            }, function (success) {

            })
        }
    },
    GetPercent(num, total) {

        let x = ''
        num = parseFloat(num);
        total = parseFloat(total);
        if (isNaN(num) || isNaN(total)) {
            return "-";
        }
        x = total <= 0 ? '0' : (Math.round(num / total * 10000) / 100.00)
        if (x > 100) {
            x = 100
        }
        return x + "%";
    },
    lockDetaile(el) {

        this.setData({
            process: true,
            activeProcess: el.currentTarget.dataset.id
        })
        // }
        this.setData({
            activeId: el.currentTarget.dataset.id
        })
    },
    get_articleDetile(el) {

        wx.navigateTo({
            url: `/pages/details/details?id=${el.currentTarget.dataset.id}`
        })
    },
    checkGrade() {
        this.setData({
            isLayer: true
        })
    },
    closeLayer() {
        this.setData({
            isLayer: false
        })
    },
    goDetails(e) {
        const id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../details/details?id=' + id
        })
    },
    goCollection() {
        wx.navigateTo({
            url: '../collection/collection'
        })
    },
    goMessage() {
        wx.navigateTo({
            url: '../newsList/newsList?type=message'
        })
    },
    goTask() {
        wx.navigateTo({
            url: '../task/task'
        })
    },
    goTask1() {
        wx.navigateTo({
            url: '../taskList/taskList'
        })
    },
    goRecharge() {
        wx.navigateTo({
            url: '../recharge/recharge'
        })
    },
    getUserInfo: function (e) {

        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    // 发起支付
    pay: function () {

    }
})
