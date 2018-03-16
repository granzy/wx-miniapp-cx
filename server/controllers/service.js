const request = require('request');
const config = require('../config')

function promiseApiGetOpenId(code) {
  const appid = config.appId;
  const appSecret = config.appSecret;
  let reqUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + appSecret + '&js_code=' + code + '&grant_type=authorization_code';

  let options = {
    method: 'get',
    url: reqUrl
  };

  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      if (res) {
        resolve(body);
      } else {
        reject(err);
      }
    });
  })
}

/**
 * 响应 GET 请求（获取openid，作为用户的唯一标识）
 */
async function jscode2session(ctx, next) {
  const { code } = ctx.query
  let data = await promiseApiGetOpenId(code);
  ctx.state.data = data;
}

module.exports = {
  jscode2session
}