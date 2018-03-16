// pages/Insurance/Insurance.js
var config = require('../../config')
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    direct: true,
    jdcssxCheck:true,
    dszzrxItems: [],
    dszzrxIndex: 0,
    dszzrxCode: '',
    csryzrxsjItems: [],
    csryzrxsjIndex: 0,
    csryzrxsjCode: '',
    csryzrxckItems: [],
    csryzrxckIndex: 0,
    csryzrxckCode: '',
    blddpsxItems: [],
    blddpsxIndex: 0,
    blddpsxCode: '',
    jdcdqxCheck: false,
    zrsxxCheck: true,
    cshhsxxItems: [],
    cshhsxxIndex: 0,
    cshhsxxCode: '',
    fdjtbssxCheck: false,
    bjmpxCheck: true,
    wfzddsftyxCheck: false
  },

  navigateToMsg: function (e) {
    let url = e.currentTarget.dataset.url;
    util.showBusy('请求中...')
    let openid = wx.getStorageSync('openid');
    let userCarInfoId = wx.getStorageSync('userCarInfo').id;
    var that = this;
    wx.request({
      url: `${config.service.host}/weapp/insertInsuranceInfo`,
      data: {
        carinfoid: userCarInfoId,
        direct: that.data.direct,
        jdcssx: that.data.jdcssxCheck,
        dszzrx: that.data.dszzrxCode,
        csryzrxsj: that.data.csryzrxsjCode,
        csryzrxck: that.data.csryzrxckCode,
        blddpsx: that.data.blddpsxCode,
        jdcdqx: that.data.jdcdqxCheck,
        zrsxx: that.data.zrsxxCheck,
        cshhsxx: that.data.cshhsxxCode,
        fdjtbssx: that.data.fdjtbssxCheck,
        bjmpx: that.data.bjmpxCheck,
        wfzddsftyx: that.data.wfzddsftyxCheck
      },
      success(result) {
        wx.hideToast();
        wx.navigateTo({
          url: url
        });
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  },

  directChange: function (e) {
    this.setData({
      direct: e.detail.value
    });
    if (!this.data.direct) {
      //设置默认值
      this.setData({
        dszzrxCode: '0',
        csryzrxsjCode: '0',
        csryzrxckCode: '0',
        blddpsxCode: '0',
        cshhsxxCode: '0'
      });
    }
  },

  jdcssxChange: function (e) {
    this.setData({
      jdcssxCheck: e.detail.value
    })
  },

  jdcdqxChange: function (e) {
    this.setData({
      jdcdqxCheck: e.detail.value
    })
  },

  zrsxxChange: function (e) {
    this.setData({
      zrsxxCheck: e.detail.value
    })
  },

  fdjtbssxChange: function (e) {
    this.setData({
      fdjtbssxCheck: e.detail.value
    })
  },

  bjmpxChange: function (e) {
    this.setData({
      bjmpxCheck: e.detail.value
    })
  },

  wfzddsftyxChange: function (e) {
    this.setData({
      wfzddsftyxCheck: e.detail.value
    })
  },

  bindDszzrxChange: function (e) {
    this.setData({
      dszzrxIndex: e.detail.value,
      dszzrxCode: this.data.dszzrxItems[e.detail.value].code
    })
  },

  bindCsryzrxsjChange: function (e) {
    this.setData({
      csryzrxsjIndex: e.detail.value,
      csryzrxsjCode: this.data.csryzrxsjItems[e.detail.value].code
    })
  },

  bindCsryzrxckChange: function (e) {
    this.setData({
      csryzrxckIndex: e.detail.value,
      csryzrxckCode: this.data.csryzrxckItems[e.detail.value].code
    })
  },

  bindBlddpsxChange: function (e) {
    this.setData({
      blddpsxIndex: e.detail.value,
      blddpsxCode: this.data.blddpsxItems[e.detail.value].code
    })
  },

  bindCshhsxxChange: function (e) {
    this.setData({
      cshhsxxIndex: e.detail.value,
      cshhsxxCode: this.data.cshhsxxItems[e.detail.value].code
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res.data)
      }
    });

    var that = this
    wx.request({
      url: `${config.service.host}/weapp/getSysCode`,
      success(result) {
        let thizDszzrxItems = [];
        let thizCsryzrxsjItems = [];
        let thizCsryzrxckItems = [];
        let thizBlddpsxItems = [];
        let thizCshhsxxItems = [];
        result.data.data.forEach(function (item) {
          if (item.type == 'dszzrx') {
            thizDszzrxItems.push({
              value: item.value,
              code: item.code
            });
          } else if (item.type == 'csryzrxsj') {
            thizCsryzrxsjItems.push({
              value: item.value,
              code: item.code
            });
          } else if (item.type == 'csryzrxck') {
            thizCsryzrxckItems.push({
              value: item.value,
              code: item.code
            });
          } else if (item.type == 'blddpsx') {
            thizBlddpsxItems.push({
              value: item.value,
              code: item.code
            });
          } else if (item.type == 'cshhsxx') {
            thizCshhsxxItems.push({
              value: item.value,
              code: item.code
            });
          }
          that.setData({
            dszzrxItems: thizDszzrxItems,
            csryzrxsjItems: thizCsryzrxsjItems,
            csryzrxckItems: thizCsryzrxckItems,
            blddpsxItems: thizBlddpsxItems,
            cshhsxxItems: thizCshhsxxItems
          })
        });
      },
      fail(error) {
        util.showModel('请求字典信息失败', error);
        console.log('request fail', error);
      }
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