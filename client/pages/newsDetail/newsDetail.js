// pages/newsDetail/newsDetail.js
const util = require('../../utils/util.js')
var config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      news:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      var that = this
      util.showBusy('请求中...')
      wx.request({
        url: `${config.service.host}/weapp/queryNewsById?id=` + options.id,
        success(result) {
          that.setData({
            news: result.data.data
          });
          wx.hideToast();
        },
        fail(error) {
          util.showModel('请求信息失败', error);
          console.log('request fail', error);
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