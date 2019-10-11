// pages/set/set.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    areaData: [{
      name: '北京公共资源交易平台',
      id: '1',
      url: 'collection_a',
      isLock: false,
      sub: ['工程建设'],
      grade: ['市']
    }, {
      name: '河北省公共资源交易平台',
      id: '2',
      url: 'collection_c',
      isLock: false,
      sub: ['工程建设'],
      grade: ['省']
    }, {
      name: '吉林省公共资源交易平台',
      id: '3',
      url: 'collection_d',
      isLock: false,
      sub: ['工程建设'],
      grade: ['省']
    }, {
      name: '黑龙江省公共资源交易平台',
      id: '4',
      url: 'collection_e',
      isLock: false,
      sub: ['工程建设'],
      grade: ['省']
    }, {
      name: '浙江省公共资源交易平台',
      id: '5',
      url: 'collection_f',
      isLock: false,
      sub: ['交易信息'],
      grade: ['省']
    }, {
      name: '江西省公共资源交易平台',
      id: '6',
      url: 'collection_g',
      isLock: false,
      sub: ['房建及市政工程'],
      grade: ['省']
    }, {
      name: '河南省公共资源交易平台',
      id: '7',
      url: 'collection_h',
      isLock: false,
      sub: ['工程建设'],
      grade: ['省']
    }, {
      name: '湖北省公共资源交易平台',
      id: '8',
      url: 'collection_j',
      isLock: false,
      sub: ['电子招标投标'],
      grade: ['省']
    }, {
      name: '湖南省公共资源交易平台',
      id: '9',
      url: 'collection_k',
      isLock: false,
      sub: ['工程建设'],
      grade: ['省']
    }, {
      name: '海南省公共资源交易平台',
      id: '10',
      url: 'collection_m',
      isLock: false,
      sub: ['工程建设'],
      grade: ['省']
    }, {
      name: '贵州省公共资源交易平台',
      id: '11',
      url: 'collection_n',
      isLock: false,
      sub: ['工程建设'],
      grade: ['省']
    }, {
      name: '陕西省公共资源交易平台',
      id: '12',
      url: 'collection_o',
      isLock: false,
      sub: ['工程建设'],
      grade: ['省']
    }, {
      name: '西藏自治区公共资源交易平台',
      id: '13',
      url: 'collection_p',
      isLock: false,
      sub: ['工程建设'],
      grade: ['自治区']
    }, {
      name: '云南省公共资源交易平台',
      id: '14',
      url: 'collection_q',
      isLock: false,
      sub: ['工程建设'],
      grade: ['省']
    }, {
      name: '内蒙古自治区公共资源交易平台',
      id: '15',
      url: 'collection_r',
      isLock: false,
      sub: ['工程建设'],
      grade: ['自治区']
    }, {
      name: '广西壮族自治区公共资源交易平台',
      id: '16',
      url: 'collection_s',
      isLock: false,
      sub: ['工程建设'],
      grade: ['自治区',]
    }, {
      name: '东莞市公共资源交易平台',
      id: '17',
      url: 'collection_t',
      isLock: false,
      sub: ['工程建设'],
      grade: ['市']
    }, {
      name: '佛山市公共资源交易平台',
      id: '18',
      url: 'collection_u',
      isLock: false,
      sub: ['工程建设'],
      grade: ['市']
    }, {
      name: '深圳市公共资源交易平台',
      id: '19',
      url: 'collection_v',
      isLock: false,
      sub: ['交易信息'],
      grade: ['市']
    }, {
      name: '广州市公共资源交易平台',
      id: '20',
      url: 'collection_w',
      isLock: false,
      sub: ['工程建设'],
      grade: ['市']
    }, {
      name: '西安市公共资源交易平台',
      id: '21',
      url: 'collection_x',
      isLock: false,
      sub: ['工程建设'],
      grade: ['市']
    },],
    contentData: [],
    industry: ['工程建设'],
    industryIndex: 0,
    isLayer: false,
    infoSources: [],
    infoIndex: 0,
    multiIndex: [0, 0],
    multiArray: [],
    objectMultiArray: [],
    index:null,
    id:null,
    isSetLayer: false,
    urlVal: null
  },
  goTask() {
    wx.navigateTo({
      url: '../taskList/taskList'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const firstData = require('../../utils/first.js').postList;
    const secondData = require('../../utils/second.js').postList
    const _id = options.id;
    const self = this;
    self.setData({
      index:options.index,
      id:options.id,
      infoSources: app.infoSources,
      "multiArray[0]": firstData,
    })
    let arr = [];
    if(_id == 17 || _id == 18 || _id== 19 || _id ==20){
      const _pid = firstData[16].regid;
      for(let i =0;i<secondData.length;i++){
        if(secondData[i].parid === _pid) {
          arr.push(secondData[i])
        }
      }
      for(let v =0;v<arr.length;v++){
        if (arr[v].regid == _id) {
          self.setData({
            "multiIndex[1]": v,
          })
        }
      }
      self.setData({
        "multiIndex[0]": 16,
        "multiArray[1]": arr,
      })
    } else if (_id == 21){
      const _pid = firstData[11].regid;
      for (let i = 0; i < secondData.length; i++) {
        if (secondData[i].parid === _pid) {
          arr.push(secondData[i])
        }
      }
      for (let v = 0; v < arr.length; v++) {
        if (arr[v].regid == _id) {
          self.setData({
            "multiIndex[1]": v,
          })
        }
      }
      self.setData({
        "multiIndex[0]": 11,
        "multiArray[1]": arr,
      })
    } else {
      for(let i =0;i<firstData.length;i++){
        if(_id == firstData[i].regid) {
          self.setData({
            "multiIndex[0]": i,
          })
        }
      }
      for(let v= 0;v<secondData.length;v++){
        if(secondData[v].parid == _id) {
          arr.push(secondData[v])
        }
      }
      self.setData({
        "multiIndex[1]": 0,
        "multiArray[1]": arr,
      })
    }
    const first = this.data.multiArray[0];
    const second = this.data.multiArray[1];
    if (first[self.data.multiIndex[0]].regid == 1 || first[self.data.multiIndex[0]].regid == 30 || first[self.data.multiIndex[0]].regid == 27 || first[self.data.multiIndex[0]].regid == 31 || first[self.data.multiIndex[0]].regid == 32 || first[self.data.multiIndex[0]].regid == 33 || first[self.data.multiIndex[0]].regid == 34) {
      this.setData({
        infoIndex: 0,
        infoSources: [{
          name: '全国公共资源中心',
          id: '1'
        }, {
            name: first[self.data.multiIndex[0]].regname + '市公共资源中心',
          id: '2'
        }, {
          name: '其他网站(5级以上用户开放))',
          id: '4'
        }]
      })
    } else if (self.data.multiIndex[1] == 0) {
      this.setData({
        infoIndex: 0,
        infoSources: [{
          name: '全国公共资源中心',
          id: '1'
        }, {
            name: first[self.data.multiIndex[0]].regname + '省公共资源中心',
          id: '2'
        }, {
          name: '其他网站(5级以上用户开放))',
          id: '4'
        }]
      })
    } else {
      this.setData({
        infoIndex: 0,
        infoSources: [{
          name: '全国公共资源中心',
          id: '1'
        }, {
            name: first[self.data.multiIndex[0]].regname + '省公共资源中心',
          id: '2'
        }, {
            name: second[self.data.multiIndex[1]].regname + '市公共资源中心',
          id: '3'
        }, {
          name: '其他网站(5级以上用户开放))',
          id: '4'
        }]
      })
    }
    
    // if (JSON.stringify(options) === '{}') {
    //   // app._request_post('api.php?a='+self.data.areaData[0].url, {}, function (success) {
    //   //   self.setData({
    //   //     contentData: success.data,
    //   //     url: 'api.php?a=' + self.data.areaData[0].url
    //   //   })
    //   // })
    // } else {
    //   this.setData({
    //     provinceIndex: options.id - 1,
    //     id: options.id,
    //     url: 'api.php?a=' + options.url
    //   })
    //   app._request_post(self.data.url, {}, function (success) {
    //     self.setData({
    //       contentData: success.data
    //     })
    //   })
    // }
  },
  bindMultiPickerChange(e) {
    const first = this.data.multiArray[0];
    const second = this.data.multiArray[1];
    if (first[e.detail.value[0]].regid == 1 || first[e.detail.value[0]].regid == 30 || first[e.detail.value[0]].regid == 27 || first[e.detail.value[0]].regid == 31 || first[e.detail.value[0]].regid == 32 || first[e.detail.value[0]].regid == 33 || first[e.detail.value[0]].regid == 34) {
      this.setData({
        infoIndex: 0,
        infoSources: [{
          name: '全国公共资源中心',
          id: '1'
        }, {
          name: first[e.detail.value[0]].regname + '市公共资源中心',
          id: '2'
        }, {
          name: '其他网站(5级以上用户开放))',
          id: '4'
        }]
      })
    } else if (e.detail.value[1] == 0) {
      this.setData({
        infoIndex: 0,
        infoSources: [{
          name: '全国公共资源中心',
          id: '1'
        }, {
          name: first[e.detail.value[0]].regname + '省公共资源中心',
          id: '2'
        }, {
          name: '其他网站(5级以上用户开放))',
          id: '4'
        }]
      })
    } else {
      this.setData({
        infoIndex: 0,
        infoSources: [{
          name: '全国公共资源中心',
          id: '1'
        }, {
          name: first[e.detail.value[0]].regname + '省公共资源中心',
          id: '2'
        }, {
          name: second[e.detail.value[1]].regname + '市公共资源中心',
          id: '3'
        }, {
          name: '其他网站(5级以上用户开放))',
          id: '4'
        }]
      })
    }
    this.setData({
      "multiIndex[0]": e.detail.value[0],
      "multiIndex[1]": e.detail.value[1]
    })
  },
  bindMultiPickerColumnChange(e) {
    const self = this;
    const firstData = require('../../utils/first.js').postList;
    const secondData = require('../../utils/second.js').postList
    if (e.detail.column == 0) {
      const _id = firstData[e.detail.value].regid;
      let arr = []
      for (let i = 0; i < secondData.length; i++) {
        if (secondData[i].parid == _id) {
          arr.push(secondData[i]);
        }
      }
      self.setData({
        "multiArray[1]": arr,
        "multiIndex[0]": e.detail.value
      })
    } else if (e.detail.column == 1) {
      self.setData({
        "multiIndex[1]": e.detail.value
      })
    }
  },
  setSure() {
    const num = this.data.multiIndex;
    const firstData = require('../../utils/first.js').postList;
    const secondData = require('../../utils/second.js').postList
    const first = num[0];
    const self = this;
    const second = num[1];
    let type;
    let arr = [];
    let id;
    if (firstData[first].type == '1') {
      id = firstData[first].regid;
      for (let i = 0; i < secondData.length; i++) {
        if (secondData[i].parid == firstData[first].regid) {
          arr.push(secondData[i])
        }
      }
      type = arr[second].type;
    } else if (firstData[first].type == '2') {
      for (let i = 0; i < secondData.length; i++) {
        if (secondData[i].parid == firstData[first].regid) {
          arr.push(secondData[i])
        }
      }
      type = arr[second].type;
      if (type == 'par') {
        id = arr[second].parid;
      } else if (type == 'cid') {
        id = arr[second].regid;
      } else if (arr[second].regname == '全部') {
        id = arr[second].parid;
      }
      
    }
    console.log(id, arr,type)
    if(id) {
      if (!type) {
        wx.showToast({
          title: '当前网站暂未开放，敬请期待',
          icon: 'none',
          duration: 2000
        })
        return;
      }
      if (self.data.id == id) {
        wx.showToast({
          title: '请选择不同的区域/网站',
          icon: 'none',
          duration: 2000
        })
        return;
      }
      if (type == 'par') {
        // 先解锁
        app._request_post('api.php?a=replace_course', {
          id: self.data.index,
          nid: id
        }, function (res) {
          if (res.status == 200) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
            wx.navigateTo({
              url: '../task/task'
            })
          } else if (res.status == 405) {
            wx.showToast({
              title: '该网站已设定，请勿重复设定',
              icon: 'none',
              duration: 2000
            })
          } else if (res.status == 401) {
            self.setData({
              isLayer: true
            })
          }
        })

      } else if (type == 'cid') {
        if (app.globalData.activeProgress.indexOf(id) >= 0) {
          wx.showToast({
            title: '当前网站已设定进程，请勿重复设定',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        // 市级需要激活
        app._request_post('api.php?a=s_unlock', {
          id: self.data.index,
          nid: id
        }, function (success) {
          // if (success.status == 200) {
          if (success.status == 401) {
            self.setData({
              isLayer: true
            })
            return
          }
          wx.showModal({
            title: '提示',
            content: '是否消耗' + success.date + '点能量解锁所选网站',
            success(res) {
              if (res.confirm) {
                app._request_post('api.php?a=replace_course', {
                  id: self.data.index,
                  nid: id
                }, function (res) {
                  if (res.status == 200) {
                    wx.showToast({
                      title: '修改成功',
                      icon: 'success',
                      duration: 2000
                    })
                    wx.navigateTo({
                      url: '../task/task'
                    })
                  } else if (res.status == 401) {
                    self.setData({
                      isLayer: true
                    })
                  }
                })
              }
            }
          })
          // }
        })
      }
    } else {
      wx.showToast({
        title: '当前网站暂未开放，敬请期待',
        icon: 'none',
        duration: 2000
      })
    }
    
  },
  provinceChange(e) {
    const self = this;
    // 判断是否已解锁当前网站
    app._request_post('api.php?a=get_unlock', {}, function (success) {
      console.log(success)
      const data = success.data.process.split(',');
      if (data.indexOf(self.data.areaData[e.detail.value].id) >= 0) {
        wx.showLoading({
          title: '数据加载中',
        })
        app._request_post('api.php?a=' + self.data.areaData[e.detail.value].url, {}, function (success) {
          wx.hideLoading();
          self.setData({
            contentData: success.data,
            provinceIndex: e.detail.value,
            url: self.data.areaData[e.detail.value].url
          })
        })
      } else {
        app._request_post('api.php?a=s_unlock', {}, function (success1) {
          wx.showModal({
            title: '提示',
            content: '当前进程未激活，是否消耗' + success1.date + '点能量解锁激活',
            success(res) {
              if (res.confirm) {
                app._request_post('api.php?a=unlock', {
                  process: self.data.areaData[e.detail.value].id,
                }, function (success) {
                  if (success.status == 200) {
                    wx.showToast({
                      title: '解锁成功',
                      icon: 'success',
                      duration: 2000
                    })
                    self.setData({
                      provinceIndex: e.detail.value,
                      url: self.data.areaData[e.detail.value].url
                    })
                    wx.showLoading({
                      title: '数据加载中',
                    })
                    app._request_post('api.php?a=' + self.data.areaData[e.detail.value].url, {}, function (success) {
                      if (success.status == 200) {
                        self.setData({
                          contentData: success.data,
                        })
                        wx.hideLoading();
                      }
                    })
                  } else if (success.status == 401) {
                    self.setData({
                      isLayer: true
                    })
                  }
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        })
      }
    })


  },
  closeLayer() {
    this.setData({
      isLayer: false
    })
  },
  industryChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    if (this.data.infoSources[e.detail.value].name.indexOf('5级') >= 0) {
      if (app.globalData.grade <= 5) {
        wx.showToast({
          title: '等级不足无法选择',
          icon: 'none',
          duration: 2000
        })
      } else if (app.globalData.grade > 5) {
        this.setData({
          isSetLayer: true,
          infoIndex: e.detail.value
        })
      }
    } else {
      this.setData({
        infoIndex: e.detail.value
      })
    }

  },
  setCancle() {
    this.setData({
      isSetLayer: false,
      infoIndex: 0
    })
  },
  bindTextAreaBlur(e) {
    console.log(e.detail.value)
    this.setData({
      urlVal: e.detail.value
    })
  },
  setUrl() {
    console.log(this.data.urlVal)
    const self = this;
    if (!this.data.urlVal || this.data.urlVal == '') {
      wx.showToast({
        title: '请输入网站地址',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    app._request_post('api.php?a=collect', {
      url: self.data.urlVal,
    }, function (success) {
      if (success.status == 200) {
        wx.showToast({
          title: '上报成功',
          icon: 'success',
          duration: 2000
        })
        this.setData({
          isSetLayer: false,
        })
      }
    })
  },
  goDetails(e) {
    console.log(e)
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../details/details?id=' + id
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
  gradeChange() {

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
    return {
      title: "这个小程序真棒",
      path: "pages/index/index?id=" + wx.getStorageSync('openid')
    }
  }
})