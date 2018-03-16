const { mysql } = require('../qcloud')

function insertQuote(insuranceid, price, tbr) {
  return mysql.insert({
    insuranceid: insuranceid || '',
    price: price || '',
    tbr: tbr || '',
    createdate: new Date().getTime()
  }, 'id').into('quote');
}

/**
 * 查询保险报价信息
 * 字典已翻译
 */
function queryQuote(insuranceid) {
  let sql = "select price,tbr,insuranceid,FROM_UNIXTIME(createdate/1000, '%Y-%m-%d %H:%i:%s') createdate from quote";
  if (insuranceid) {
    return mysql.raw(sql + " where insuranceid = ?", insuranceid).then(function (resp) {
      return resp;
    });
  } else {
    return mysql.raw(sql).then(function (resp) {
      return resp;
    });
  }
}

async function insert(ctx, next) {
  const { insuranceid, price, tbr } = ctx.request.body
  let data = await insertQuote(insuranceid, price, tbr);
  ctx.state.data = { id: data[0] };
}

async function queryByInsuranceid(ctx, next) {
  const { insuranceid } = ctx.query
  let data = await queryQuote(insuranceid);
  ctx.state.data = data[0];
}

module.exports = {
  insert,queryByInsuranceid
}