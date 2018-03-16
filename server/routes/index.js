/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

router.get('/demo', controllers.demo)

router.get('/insertCarInfo', controllers.carinfo.insert)

router.post('/updateCarInfo', controllers.carinfo.update)

router.get('/queryCarListByOpenid', controllers.carinfo.queryByOpenid)

router.get('/queryCarList', controllers.carinfo.queryList)

router.get('/jscode2session', controllers.service.jscode2session)

router.get('/getSysCode', controllers.syscode.getSysCode)

router.get('/insertInsuranceInfo', controllers.insurance.insert)

router.post('/updateInsuranceInfo', controllers.insurance.update)

router.get('/queryInsuranceByOpenid', controllers.insurance.queryByOpenid)

router.get('/queryInsuranceList', controllers.insurance.queryList)

router.get('/queryWaitForQuote', controllers.insurance.queryWaitForQuote)

router.post('/insertQuote', controllers.quote.insert)

router.get('/queryQuoteByInsuranceid', controllers.quote.queryByInsuranceid)

router.post('/insertNews', controllers.news.insert)

router.post('/updateNews', controllers.news.update)

router.get('/queryListNews', controllers.news.queryList)

router.get('/queryListNewsByLimit', controllers.news.queryListByLimit)

router.get('/queryNewsById', controllers.news.queryNewsById)

router.post('/insertCarousel', controllers.carousel.insert)

router.get('/queryListCarousel', controllers.carousel.queryList)

router.post('/updateCarousel', controllers.carousel.update)

router.post('/updateServicePhoneNumber', controllers.servicenumber.update)

router.get('/queryServiceNumber', controllers.servicenumber.queryServiceNumber)
//ci万象优图
router.post('/ci', controllers.ci)

module.exports = router
