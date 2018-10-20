//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //参与页面渲染的数据
    motto: '用户位的坐标',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //页面渲染后执行
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getLoc:function(e){
    let that=this;
    wx.getLocation({
      // type:'wgs84',
      success: function(res) {
        let lat=res.latitude;
        let lon=res.longitude;
        console.log(res)
        that.setData({
          lon:lon,
          lat:lat,
          markers:[{
            latitude:lat,
            longitude:lon,
            iconPath: app.globalData.userInfo.avatarUrl,
            width:20,
            height:20,
            borderRadius:0.5
          }]
        })
        // wx.openLocation({
        //   latitude: lat,
        //   longitude: lon,
        // })
      },
    })
  }
})
