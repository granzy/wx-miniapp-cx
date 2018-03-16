// pages/mycarlist/mycarlist.js
const util = require('../../utils/util.js')
var config = require('../../config')

var loadCarInfo = function (that) {
  util.showBusy('请求中...')
  wx.request({
    url: `${config.service.host}/weapp/queryCarList`,
    success(result) {
      that.setData({
        carList: result.data.data
      });
      wx.hideToast();
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

    carList: []

  },
  deleteCarInfo: function (e) {
    let id = e.currentTarget.dataset.id;
    var that = this
    wx.showModal({
      title: '',
      content: '确定删除该车辆信息？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          util.showBusy('请求中...')          
          wx.request({
            url: `${config.service.host}/weapp/updateCarInfo`,
            method: 'POST',
            data: {
              id: id,
              available: '0'
            },
            success(result) {
              wx.showToast({
                title: '已完成',
                icon: 'success',
                duration: 3000
              });
              loadCarInfo(that);
            },
            fail(error) {
              util.showModel('请求失败', error);
              console.log('request fail', error);
            }
          })

        }
      }
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    loadCarInfo(this);
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