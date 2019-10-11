// pages/set/set.js
const app = getApp()
const firstData = require('../../utils/first.js').postList;     //省
const secondData = require('../../utils/second.js').postList    //市
const municipality = [1, 32, 33, 34, 30, 27, 31]                //直辖市id
Page({

    /**
     * 页面的初始数据
     */
    data: {
        municipality:municipality,
        multiArray: [],         //省list
        infoSources: [],        //市list
        infoIndex: 0,           //当前市index
        multiIndex: 0,          //当前省index
        already: {              //返回的数据
            province: [],       //已开发省
            city: [],           //已开发市
            notDeveloped: [],   //已开发市但省没开发
        },
        nstd:null,          //修改 or 添加
        courseIndex:null,   //修改进程的id
        courseList:[],
        options:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
            options:options,
            nstd: options.id !== "undefined" && options.id !== "" ? true : false,
            courseIndex:options.index
        })

        this.getDeveloped();
    },
    screeningCity(pId, stu, index = null){
        let indexs=[]
        let arr=[]
        let id = pId
        let type = stu
        if (stu){
            for (let index in firstData){
                if (firstData[index].regid === id){
                    indexs[0] = index
                }
            }
        }else {
            indexs[0] = index
        }

        const {city,notDeveloped} = this.data.already
        let hasArr = []

        if (!notDeveloped.includes(Number(id))) { //开发了市，但没开发省
            hasArr = [
                //默认每一个省下都有一个全部，代表省自身
                {
                    "regid": id,
                    "parid": '2',
                    "regname": `${firstData[indexs[0]].regname}${municipality.includes(Number(id)) ? '市' : '省'}公共资源中心`,
                    "regtype": "2",
                    "ageid": "0",
                    "type": "par"
                },
            ]
        }
        let notArr = []
        for (let item of secondData) {  //显示省下所有城市
            if (item.parid == id) {
                notArr.push(JSON.parse(JSON.stringify(item))); //解决直接引用引发的BUG
            }
        }

        for (let item of notArr) {      //筛选已开发了的市
            if (city.includes(Number(item.regid))) {
                item.regname = `${item.regname}市公共资源中心`
                hasArr.push(item)
            }
        }
        if (type){
            return [hasArr,indexs[0]]
        } else {
            return hasArr
        }

    },

    setDeft(options){
        let indexs=[]

        let obj = this.screeningCity(options.id,options.nid)
        let hasArr = obj[0]
        indexs[0] = obj[1]

        for (let index in hasArr){
            if (hasArr[index].regid === options.nid){
                indexs[1] = index
            }
        }

        this.setData({
            multiIndex:indexs[0],
            infoSources:hasArr,
            infoIndex:indexs[1]
        })

    },
    getDeveloped() {
        //    获取已开发的省市id
        app._request_get('api.php?a=has_developed', '', res => {
            this.setData({
                'already.province': res.p,
                'already.city': res.c,
                'already.notDeveloped': res.wkf,
            })
            this.setInitialization();
        }, err => {

        })
    },
    setInitialization() {
        //设置初始值
        const {province} = this.data.already

        let arr = [];
        for (let obj of firstData) {
            if (province.includes(Number(obj.regid))) {
                arr.push(obj)
            }
        }
        this.setData({
            'multiArray': arr,
            infoSources: [{"regid": 1, "regname": '北京市公共资源中心',},]
        })
        if (this.data.nstd){
            this.setDeft(this.data.options)
        }else {

        }

    },
    bindMultiPickerChange({detail}) {
        let index = detail.value    //索引

        this.setData({ //更新视图显示
            multiIndex: index,
            infoIndex: 0
        })

        const {city, notDeveloped} = this.data.already
        const id = firstData[index].regid; //省的regid
        let hasArr = this.screeningCity(id, false, index)

        // multiIndex[0] 实时更新第一列选中的数据
        this.setData({
            infoSources: hasArr
        })
    },
    industryChange({detail}) {
        this.setData({
            infoIndex: detail.value
        })
    },

    setSure(){
        const {multiArray,multiIndex,infoSources,infoIndex,nstd,courseIndex} = this.data
        const {energyConfig} = app.globalData
        function toast(type,stu = null) {
            switch (type) {
                case 0:
                    wx.showToast({
                        title:stu?`添加`:`扣除${energyConfig[4].energy}点能量`,
                        duration:1500
                    })
                    break;
                case 1:
                    wx.showToast({
                        title:stu,
                        duration:1500,
                        icon:'none'
                    })
                    break;
            }
        }
        if (nstd){ //修改 or 确认
            //更新
            app._request_post('api.php?a=replace_course',{
                id:courseIndex,
                nid:infoSources[infoIndex].regid,
                noteid: multiArray[multiIndex].regid,
            },res=>{
                if (res.status === 200){
                    wx.navigateBack()
                    toast(0,false)
                }else {
                    toast(1, res.meg)
                }
            })
        } else {
            //确认设定
            app._request_post('api.php?a=unlock',{
                process:infoSources[infoIndex].regid,
                noteid:multiArray[multiIndex].regid
            },res=>{
                if (res.status === 200){
                    wx.navigateBack()
                    toast(0,true)
                }else {
                    toast(1,res.meg)
                }
            })
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
