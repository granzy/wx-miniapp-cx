// pages/newslist/newslist.js
const util = require('../../utils/util.js')
var config = require('../../config')
var from = 0;
var allNews = [];

//加载数据
var loadNewsData = function(that){
  that.setData({
    hidden:false
  });

  wx.request({
    url: `${config.service.host}/weapp/queryListNewsByLimit`,
    data:{
      from: from,
      size:10
    },
    success(result) {
      for (var i = 0; i < result.data.data.length; i++) {
        allNews.push(result.data.data[i]);
      }
      
      that.setData({
        newsList: allNews
      });

      from = parseInt(from)+10;
      that.setData({
        hidden:true
      });
    },
    fail(error) {
      util.showModel('请求信息失败', error);
      console.log('request fail', error);
    }
  })

}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList: [],
    hidden: true,
    scrollTop: 0,
    scrollHeight: 0  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    from = 0;
    allNews = [];
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    });
    loadNewsData(that);
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
    var that = this;
    from = 0;
    allNews = [];
    that.setData({
      scrollTop: 0
    });
    loadNewsData(that);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    loadNewsData(that);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})