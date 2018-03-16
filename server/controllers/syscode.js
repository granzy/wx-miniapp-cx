const { mysql } = require('../qcloud')

function querySysCode() {
  return mysql.select('*')
    .from('syscode').then(function (rows) {
      return rows;
    });
}

/**
 * 响应 GET 请求（获取字典信息）
 */
async function getSysCode(ctx, next) {
  let data = await querySysCode();
  ctx.state.data = data;
}

module.exports = {
  getSysCode
}