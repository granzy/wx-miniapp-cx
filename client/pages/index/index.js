//index.js
var config = require('../../config')
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    newsList:[],
    servicephonenumber:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  navigateToNewsList: function (e) {
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    })
  },

  makePhoneCall: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.servicephonenumber,
      success: function () {
        console.log("成功拨打电话")
      }
    })
  },

  loadData:function(that,type){
    //首页轮播
    wx.request({
      url: `${config.service.host}/weapp/queryListCarousel`,
      success(result) {
        let temImgUrls = [];
        if (result.data.data.length > 0) {
          result.data.data.forEach(function (item) {
            temImgUrls.push(item.url);
          });
        }
        that.setData({
          imgUrls: temImgUrls
        });
      },
      fail(error) {
        util.showModel('请求信息失败', error);
        console.log('request fail', error);
      }
    });
    //请求新闻
    wx.request({
      url: `${config.service.host}/weapp/queryListNewsByLimit?from=0&size=4`,
      success(result) {
        that.setData({
          newsList: result.data.data
        });
      },
      fail(error) {
        util.showModel('请求信息失败', error);
        console.log('request fail', error);
      }
    });

    //客服电话
    wx.request({
      url: `${config.service.host}/weapp/queryServiceNumber`,
      success(result) {
        let phonenumber = result.data.data[0] ? result.data.data[0].phonenumber : '';
        that.setData({
          servicephonenumber: phonenumber
        });
      },
      fail(error) {
        util.showModel('请求信息失败', error);
        console.log('request fail', error);
      }
    });
  },

  onLoad: function () {
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
    
    this.loadData(this,'load');

  },
  onPullDownRefresh: function () {
    this.loadData(this,'refresh');
    wx.stopPullDownRefresh();
  },
  scroll: function (e) {
  }
})
