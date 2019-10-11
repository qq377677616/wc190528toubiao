// pages/lottery/lottery.js
var app = getApp()
var awardsConfig = [];

const { $Toast } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    awardsList: {},
    animationData: {},
    btnDisabled: '',
    changes:0,
    lotteryVal:'开始抽奖'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 查询抽奖机会
    var that = this;
    app._request_post('api.php?a=s_luckdraw',{
      grade:1
    },function(success){
      console.log(success)
      if(success.status == 200){
        that.setData({
          changes: success.data.luckydraw_num
        })
      // } else if (success.status == 410) {
      //   console.log(11)
      //   that.setData({
      //     lotteryVal: '活动已结束'
      //   })
      }
    })
    // 查询奖品设置
    app._request_post('api.php?a=query_prize', {}, function (success) {
      const arr = [];
      console.log(success)
      if (success.status == 200) {
        for(let i =0;i<success.data.length;i++) {
            success.data[i].name = +success.data[i].name+'能量'
            arr.push(success.data[i])
        }

        // getAwardsConfig
        app.awardsConfig = {
          chance: true,
          awards: arr
        }

        // wx.setStorageSync('awardsConfig', JSON.stringify(awardsConfig))


        // 绘制转盘
        console.log(app.awardsConfig.awards)
        awardsConfig = app.awardsConfig.awards; 
        var awardsConfig = app.awardsConfig.awards,
          len = awardsConfig.length,
          rotateDeg = 360 / len / 2 + 90,
          html = [],
          turnNum = 1 / len  // 文字旋转 turn 值
        that.setData({
          btnDisabled: app.awardsConfig.chance ? '' : 'disabled'
        })
        var ctx = wx.createContext()
        for (var i = 0; i < len; i++) {
          // 保存当前状态
          ctx.save();
          // 开始一条新路径
          ctx.beginPath();
          // 位移到圆心，下面需要围绕圆心旋转
          ctx.translate(150, 150);
          // 从(0, 0)坐标开始定义一条新的子路径
          ctx.moveTo(0, 0);
          // 旋转弧度,需将角度转换为弧度,使用 degrees * Math.PI/180 公式进行计算。
          ctx.rotate((360 / len * i - rotateDeg) * Math.PI / 180);
          // 绘制圆弧
          ctx.arc(0, 0, 150, 0, 2 * Math.PI / len, false);

          // 颜色间隔
          if (i % 2 == 0) {
            ctx.setFillStyle('rgba(255,184,32,.1)');
          } else {
            ctx.setFillStyle('rgba(255,203,63,.1)');
          }

          // 填充扇形
          ctx.fill();
          // 绘制边框
          ctx.setLineWidth(0.5);
          ctx.setStrokeStyle('rgba(228,55,14,.1)');
          ctx.stroke();

          // 恢复前一个状态
          ctx.restore();

          // 奖项列表
          html.push({id:awardsConfig[i].id, turn: i * turnNum + 'turn', lineTurn: i * turnNum + turnNum / 2 + 'turn', award: awardsConfig[i].name });
        }
        that.setData({
          awardsList: html
        });
      }
    })
    

   
  },

  getLottery: function () {
  
    if(this.data.changes<=0){
      wx.showToast({
        title: '您还没有抽奖机会',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var that = this
    app._request_post('api.php?a=luckdraw',{
      openid:wx.getStorageSync('openid')
    },function(success){
      // 记录奖品
      console.log(success)
      if(success.status === 410){
        $Toast({
          content: '活动已结束',
          type: 'warning'
      });
      return
      }
      if(success.status === 200) {
        // 中奖提示
        console.log(that.data.awardsList)
        let awardIndex;
        for(let i =0;i<that.data.awardsList.length;i++) {
          if (that.data.awardsList[i].id == success.data.id ){
            awardIndex = i;
          }
        }

        // 获取奖品配置
        var awardsConfig = app.awardsConfig,
          runNum = 8
        if (awardIndex < 2) awardsConfig.chance = false
        console.log(awardIndex)

        // 旋转抽奖
        app.runDegs = app.runDegs || 0
        console.log('deg', app.runDegs)
        app.runDegs = app.runDegs + (360 - app.runDegs % 360) + (360 * runNum - awardIndex * (360 / awardsConfig.awards.length))
        console.log('deg', app.runDegs)

        var animationRun = wx.createAnimation({
          duration: 4000,
          timingFunction: 'ease'
        })

        that.animationRun = animationRun
        animationRun.rotate(app.runDegs).step()
        that.setData({
          animationData: animationRun.export(),
          btnDisabled: 'disabled'
        })
        var winAwards = wx.getStorageSync('winAwards') || { data: [] }
        winAwards.data.push(awardsConfig.awards[awardIndex].name)
        wx.setStorageSync('winAwards', winAwards)

        setTimeout(function () {
          wx.showModal({
            title: '恭喜',
            content: '获得' + success.data.name +'能量',
            showCancel: false
          })
          that.setData({
            changes:parseInt(that.data.changes) - 1
          })
          if (awardsConfig.chance) {
            that.setData({
              btnDisabled: ''
            })
          }
        }, 4000);
      }
    })


    /*wx.request({
      url: '../../data/getLottery.json',
      data: {},
      header: {
          'Content-Type': 'application/json'
      },
      success: function(data) {
        console.log(data)
      },
      fail: function(error) {
        console.log(error)
        wx.showModal({
          title: '抱歉',
          content: '网络异常，请重试',
          showCancel: false
        })
      }
    })*/
  },
  goReword(){
    wx.navigateTo({
      url: '../newsList/newsList?type=reword'
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