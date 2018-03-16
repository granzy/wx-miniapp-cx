const CONF = {
  port: '5757',
  rootPathname: '',

  // 微信小程序 App ID
  appId: 'wx7c1980d7ab920877',

  // 微信小程序 App Secret
  appSecret: 'f1ddaa59dd31c92290701cead0ee055f',

  // 是否使用腾讯云代理登录小程序
  useQcloudLogin: true,

  /**
   * MySQL 配置，用来存储 session 和用户信息
   * 若使用了腾讯云微信小程序解决方案
   * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
   */
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    db: 'cAuth',
    //pass: 'wx7c1980d7ab920877',
    pass: 'root',
    char: 'utf8mb4'
  },

  cos: {
    /**
     * 区域
     * 华北：cn-north
     * 华东：cn-east
     * 华南：cn-south
     * 西南：cn-southwest
     * 新加坡：sg
     * @see https://www.qcloud.com/document/product/436/6224
     */
    region: 'ap-guangzhou',
    // Bucket 名称
    fileBucket: 'qcloud',
    // 文件夹
    uploadFolder: ''
  },

  // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.cloud.tencent.com/capi
  // 微信登录态有效期
  serverHost: 'http://localhost',
  tunnelServerUrl: 'http://tunnel.ws.qcloud.la',
  tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
  qcloudAppId: '1256075917',
  qcloudSecretId: 'AKIDvjNp6BMlKn6C3nNhrpgXFl4CBMMA2Ngn',
  qcloudSecretKey: '3vbAXlneJvMQPDpSE7xgBGE1c2IPK6lI',

  wxLoginExpires: 7200,
  wxMessageToken: 'abcdefgh'
}

module.exports = CONF
