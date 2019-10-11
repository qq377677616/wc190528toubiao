// pages/task/task.js
const app = getApp()
let aData = [];
Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: [
            '安徽',
            "福建",
            "甘肃",
            "江苏",
            "辽宁",
            "宁夏",
            "青海",
            "山东",
            "山西",
            "上海",
            "四川",
            "新疆",
            "天津",
            "重庆",
        ],
        noList: [
            {
                "regid": "18",
                "parid": "1",
                "regname": "安徽",
                "regtype": "1",
                "ageid": "0",
                "type": "3"
            },
            {
                "regid": "19",
                "parid": "1",
                "regname": "福建",
                "regtype": "1",
                "ageid": "0",
                "type": "3"
            },
            {
                "regid": "20",
                "parid": "1",
                "regname": "甘肃",
                "regtype": "1",
                "ageid": "0",
                "type": "3"
            },

            {
                "regid": "21",
                "parid": "1",
                "regname": "江苏",
                "regtype": "1",
                "ageid": "0",
                "type": "3"
            },
            {
                "regid": "22",
                "parid": "1",
                "regname": "辽宁",
                "regtype": "1",
                "ageid": "0",
                "type": "3"
            },
            {
                "regid": "23",
                "parid": "1",
                "regname": "宁夏",
                "regtype": "1",
                "ageid": "0",
                "type": "3"
            },
            {
                "regid": "24",
                "parid": "1",
                "regname": "青海",
                "regtype": "1",
                "ageid": "0",
                "type": "3"
            },
            {
                "regid": "25",
                "parid": "1",
                "regname": "山东",
                "regtype": "1",
                "ageid": "0",
                "type": "3"
            },
            {
                "regid": "26",
                "parid": "1",
                "regname": "山西",
                "regtype": "1",
                "ageid": "0",
                "type": "3"
            },
            {
                "regid": "27",
                "parid": "1",
                "regname": "上海",
                "regtype": "1",
                "ageid": "0",
                "type": "3"
            },
            {
                "regid": "28",
                "parid": "1",
                "regname": "四川",
                "regtype": "1",
                "ageid": "0",
                "type": "3"
            },
            {
                "regid": "29",
                "parid": "1",
                "regname": "新疆",
                "regtype": "1",
                "ageid": "0",
                "type": "3"
            },
            {
                "regid": "30",
                "parid": "1",
                "regname": "天津",
                "regtype": "1",
                "ageid": "0",
                "type": "3"
            },
            {
                "regid": "31",
                "parid": "1",
                "regname": "重庆",
                "regtype": "1",
                "ageid": "0",
                "type": "3"
            },
            // {
            //     "regid":"32",
            //     "parid":"1",
            //     "regname":"香港",
            //     "regtype":"1",
            //     "ageid":"0",
            //     "type":"3"
            // },
            // {
            //     "regid":"33",
            //     "parid":"1",
            //     "regname":"澳门",
            //     "regtype":"1",
            //     "ageid":"0",
            //     "type":"3"
            // },
            // {
            //     "regid":"34",
            //     "parid":"1",
            //     "regname":"台湾",
            //     "regtype":"1",
            //     "ageid":"0",
            //     "type":"3"
            // }
        ],
        isLayer: false,
        isLayer1: false,
        userHead: null,
        energy: 0,
        areaData: [],
        pre: 0,
        grade: '',
        modifyVal: '修改',
        isStep: false,
        step: 1,
        count: 0,
    },
    bindPickerChange({ detail }) {

        app._request_post('api.php?a=address_collect',
            { openid: wx.getStorageSync('openid'), regid: this.data.noList[detail.value].regid }, (success) => {
                if (success.status === 200) {
                    wx.showToast({
                        title: '添加成功',
                        icon: 'none',
                        duration: 2000
                    })
                } else {
                    wx.showToast({
                        title: success.msg,
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function (options) {
        const self = this;
        // 是否需要新手引导

        // 查询能量值
        app._request_post('api.php?a=query_energy', {}, function (success) {
            // console.log()
            if (success.status == 200) {
                app.globalData.energy = success.data.energy;
                app.globalData.pre = self.GetPercent(success.data.energy, 1000)
                self.setData({
                    userHead: wx.getStorageSync('userInfo').avatarUrl,
                    energy: app.globalData.energy,
                    grade: '../../image/grade' + app.globalData.grade + '.png',
                    pre: app.globalData.pre,
                    modifyVal: '修改',
                    areaData: [],
                    isStep: false,
                    step: 1,
                    aData: [],
                })
                // 查询当前进程TODO
                app._request_post('api.php?a=query_course', {}, function (success) {
                    if (success.status == 200) {
                        if (success.count > 0) {

                            aData = success.date
                            const num = success.count;
                            const data = success.date.concat();
                            // console.log(data)
                            // for (let i of success.data){
                            //   for (let x of success)
                            // }
                            let pArr = [];
                            // 将已添加网站缓存下来
                            for (let v = 0; v < success.date.length; v++) {
                                // console.log(success.date[v])
                                if (JSON.stringify(success.date[v]) !== '[]') {
                                    // pArr.push(success.date[v][0].codeid)
                                }
                            }
                            app.globalData.activeProgress = pArr
                            if (num > success.date.length) {
                                for (let i = 0; i < num - success.date.length; i++) {
                                    data.push([{}])
                                }
                            }
                            // console.log(data)
                            self.setData({
                                areaData: data,
                                count: num,
                            })
                        } else {
                            self.setData({
                                areaData: [],
                                count: 0,
                            })
                        }
                    } else if (success.status == 401) {
                        self.setData({
                            areaData: []
                        })
                    }
                    if (!wx.getStorageSync('new')) {
                        self.setData({
                            isStep: true,
                            step: 1
                        })
                    }
                })
            }
        })


    },
    // 添加一个进程
    add() {
        const self = this;
        if (self.data.count > aData.length) {
            wx.showToast({
                title: '当前有进程未设定，请勿重复添加进程',
                icon: 'none',
                duration: 2000
            })
            return;
        }
        if (aData.length == 1 && aData[0].length == 0) {
            wx.showToast({
                title: '当前有进程未设定，请勿重复添加进程',
                icon: 'none',
                duration: 2000
            })
            return;
        }
        if (self.data.count == 0) {
            wx.showModal({
                title: '提示',
                content: '首次添加进程免费，否添加？',
                success(res) {
                    if (res.confirm) {
                        // 调取接口
                        app._request_post('api.php?a=course', { openid: 1 }, function (success) {
                            console.log(success)
                            if (success.status == 200) {
                                wx.showToast({
                                    title: '添加成功',
                                    icon: 'success',
                                    duration: 2000
                                })
                                self.onShow();
                            } else if (success.status == 201) {
                                // 能量不足
                                self.setData({
                                    isLayer: true
                                })
                            }
                        })
                    }
                }
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '是否消耗100点能量添加一个进程？\n如已解锁过进程将保留进程数量x10作为小程序能量最低值。 例如：您有3个进程，那么要解锁第四个进程需要的能量为：100+3×10=130。低于130点能量将无法解锁新进程。',
                success(res) {
                    if (res.confirm) {
                        // 调取接口
                        app._request_post('api.php?a=course', {}, function (success) {
                            console.log(success)
                            if (success.status == 200) {
                                wx.showToast({
                                    title: '添加成功',
                                    icon: 'success',
                                    duration: 2000
                                })
                                self.onShow();
                            } else if (success.status == 201) {
                                // 能量不足
                                self.setData({
                                    isLayer: true
                                })
                            }
                        })
                    }
                }
            })
        }
    },
    next(e) {
        if (parseInt(e.currentTarget.dataset.index) < 2) {
            this.setData({
                step: parseInt(e.currentTarget.dataset.index) + 1
            })
        } else {
            this.setData({
                isStep: false
            })
            wx.setStorageSync("new", '1')
        }
    },
    goRecharge() {
        wx.navigateTo({
            url: '../recharge/recharge'
        })
        // if (app.globalData.grade > 3) {
        //   wx.navigateTo({
        //     url: '../recharge/recharge'
        //   })
        // } else {
        //   wx.showToast({
        //     title: '三级以上才能充值哦',
        //     icon: 'none',
        //     duration: 2000
        //   })
        // }
    },
    checkGrade() {
        this.setData({
            isLayer1: true
        })
    },
    goTask() {
        wx.navigateTo({
            url: '../taskList/taskList'
        })
    },
    goTaskDetails() {
        wx.navigateTo({
            url: '../stepInfo/stepInfo'
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    onLoad() {
        // 加载省市区数据
        // wx.request({
        //   url: '../../utils/first.json',
        //   success(res){
        //
        //   }
        // })

    },
    closeLayer() {
        this.setData({
            isLayer: false
        })
    },
    closeLayer1() {
        this.setData({
            isLayer1: false
        })
    },
    unlock(e) {
        console.log(e)
        const self = this;
        const id = e.currentTarget.dataset.id
        if (self.data.modifyVal == '取消') {
            wx.navigateTo({
                url: '../modify/modify?id=' + id + '&url=' + e.currentTarget.dataset.url
            })
            return;
        } else {

            if (e.currentTarget.dataset.status) {
                // wx.showToast({
                //   title: '不能重复解锁',
                //   icon: 'none',
                //   duration: 2000
                // })
                wx.navigateTo({
                    url: '../set/set?id=' + id + '&url=' + e.currentTarget.dataset.url
                })
                return;
            }

            // app._request_post('api.php?a=s_unlock',{},function(success1){
            //   if(success1.status == 200) {
            //     wx.showModal({
            //       title: '提示',
            //       content: '确认消耗'+success1.date+'点能量解锁？',
            //       success(res) {
            //         if (res.confirm) {
            //           // TODO 处理能量是否够解锁
            //           app._request_post('api.php?a=unlock', {
            //             process: id,
            //             openid: wx.getStorageSync('openid')
            //           }, function (success) {
            //             if (success.status == 401) {
            //               self.setData({
            //                 isLayer: true
            //               })
            //             } else if (success.status == 405) {
            //               wx.showToast({
            //                 title: '不能重复解锁',
            //                 icon: 'none',
            //                 duration: 2000
            //               })
            //             } else if (success.status == 200) {
            //               const data = self.data.areaData;
            //               for (let i = 0; i < data.length; i++) {
            //                 if (data[i].id == id) {
            //                   data[i].isLock = true;
            //                 }
            //               }
            //               self.setData({
            //                 areaData:data
            //               })
            //               wx.showToast({
            //                 title: '解锁成功',
            //                 icon: 'success',
            //                 duration: 2000
            //               })
            //               self.onShow();

            //             }
            //           })
            //         } else if (res.cancel) {
            //           console.log('用户点击取消')
            //         }
            //       }
            //     })
            //   }
            // })
        }

    },
    set1(e) {
        console.log(e)
        console.log('stu', e.currentTarget.dataset.status)
        // console.log(this.d)
        // if(e.currentTarget.dataset.status) {
        //   wx.navigateTo({
        //     url: '../modify/modify?id=' + e.currentTarget.dataset.status + '&index=' + e.currentTarget.dataset.index
        //   })
        // } else {
        wx.navigateTo({
            url: `../set/set?index=${e.currentTarget.dataset.index}&id=${e.currentTarget.dataset.status}&nid=${e.currentTarget.dataset.note}&mo=${e.currentTarget.dataset.list}`
        })
        // }
    },
    modify() {
        const self = this;
        if (this.data.modifyVal == '修改') {


            const data = self.data.areaData;
            for (let i = 0; i < data.length; i++) {
                if (!data[i].isLock) {
                    data[i].isEdit = true;
                }
            }

            self.setData({
                modifyVal: '取消',
                areaData: data
            })
        } else {

            const data = self.data.areaData;
            for (let i = 0; i < data.length; i++) {
                data[i].isEdit = false;
            }
            self.setData({
                modifyVal: '修改',
                areaData: data
            })
        }
        // wx.navigateTo({
        //   url: '../modify/modify'
        // })
    },
    /**
     * 生命周期函数--监听页面显示
     */

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },
    GetPercent(num, total) {
        /// <summary>
        /// 求百分比
        /// </summary>
        /// <param name="num">当前数</param>
        /// <param name="total">总数</param>
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
        return {
            title: "这个小程序真棒",
            path: "pages/index/index?id=" + wx.getStorageSync('openid')
        }
    }
})