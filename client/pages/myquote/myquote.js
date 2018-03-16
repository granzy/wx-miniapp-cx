const util = require('../../utils/util.js')
var config = require('../../config')

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["待报价", "已报价", "全部"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    insuranceInfo:[]
  },
  loadData:function(that){
    util.showBusy('请求中...')
    wx.request({
      url: `${config.service.host}/weapp/queryInsuranceByOpenid?openid=` + wx.getStorageSync("openid"),
      success(result) {
        that.setData({
          insuranceInfo: result.data.data || []
        });
        wx.hideToast();
      },
      fail(error) {
        util.showModel('请求信息失败', error);
        console.log('request fail', error);
      }
    })
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    this.loadData(this);

  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    this.loadData(this);
  }
});