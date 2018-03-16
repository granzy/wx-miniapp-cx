//app.js
var config = require('config')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          if (!wx.getStorageSync("openid")){            
            //发起网络请求
            wx.request({
              url: `${config.service.host}/weapp/jscode2session?code=` + res.code,
              success(result) {
                let openid = JSON.parse(result.data.data).openid || '';
                wx.setStorageSync("openid", openid);
              },
              fail(error) {
                console.log('request fail', error);
              }
            })
          }
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            this.globalData.userInfo = res.userInfo

            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})