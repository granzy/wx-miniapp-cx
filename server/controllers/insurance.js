const { mysql } = require('../qcloud')

/**
 * 插入保险信息
 */
function insertInsuranceInfo(insuranceInfo) {
  return mysql.insert({
    carinfoid: insuranceInfo.carinfoid || '',
    direct: insuranceInfo.direct || '',
    jdcssx: insuranceInfo.jdcssx || '',
    dszzrx: insuranceInfo.dszzrx || '',
    csryzrxsj: insuranceInfo.csryzrxsj || '',
    csryzrxck: insuranceInfo.csryzrxck || '',
    blddpsx: insuranceInfo.blddpsx || '',
    jdcdqx: insuranceInfo.jdcdqx || '',
    zrsxx: insuranceInfo.zrsxx || '',
    cshhsxx: insuranceInfo.cshhsxx || '',
    fdjtbssx: insuranceInfo.fdjtbssx || '',
    bjmpx: insuranceInfo.bjmpx || '',
    wfzddsftyx: insuranceInfo.wfzddsftyx || '',
    createdate: new Date().getTime(),
    status: '0'
  }, 'id').into('insuranceinfo');
}

function updateInsuranceInfo(insuranceInfo) {
  return mysql('insuranceinfo')
    .where('id', '=', insuranceInfo.id)
    .update({
      status: insuranceInfo.status,
      updatedate: new Date().getTime()
    })
}

/**
 * 查询保险信息
 * 字典已翻译
 */
function queryInsurance(openid) {
  let sql = "select insuranceinfo.id,direct,jdcssx,getsyscodename(dszzrx,'dszzrx') dszzrx,dszzrx dszzrxCode,getsyscodename(csryzrxsj,'csryzrxsj') csryzrxsj, csryzrxsj csryzrxsjCode,getsyscodename(csryzrxck, 'csryzrxck') csryzrxck,csryzrxck csryzrxckCode, getsyscodename(blddpsx, 'blddpsx') blddpsx,blddpsx blddpsxCode, jdcdqx, zrsxx, getsyscodename(cshhsxx, 'cshhsxx') cshhsxx,cshhsxx cshhsxxCode, fdjtbssx, bjmpx, wfzddsftyx,carinfo.carno,carinfo.phoneno,carinfo.idcardno,getsyscodename(insuranceinfo.status, 'insurancestatus') status,status statusCode,FROM_UNIXTIME(insuranceinfo.createdate/1000, '%Y-%m-%d %H:%i:%s') createdate ,(select price from quote where quote.insuranceid = insuranceinfo.id order by createdate desc limit 1) as price from insuranceinfo, carinfo where insuranceinfo.carinfoid = carinfo.id and carinfo.available = '1' ";
  if (openid) {
    return mysql.raw(sql + " and carinfo.openid = ? order by insuranceinfo.createdate desc ", openid).then(function (resp) {
      return resp;
    });
  } else {
    return mysql.raw(sql).then(function (resp) {
      return resp;
    });
  }
}

/**
 * 响应 GET 请求（插入车辆信息并返回插入状态）
 */
async function insert(ctx, next) {
  let data = await insertInsuranceInfo(ctx.query);
  ctx.state.data = { id: data[0] };
}

async function update(ctx, next) {
  let data = await updateInsuranceInfo(ctx.request.body);
  ctx.state.data = { id: data };
}

async function queryList(ctx, next) {
  let data = await queryInsurance();
  ctx.state.data = data[0];
}

async function queryByOpenid(ctx, next) {
  const { openid } = ctx.query
  let data = await queryInsurance(openid);
  ctx.state.data = data[0];
}

function queryWaitForQuoteFun(){
  return mysql.raw("SELECT count(*) as num FROM insuranceinfo,carinfo WHERE insuranceinfo.carinfoid = carinfo.id AND carinfo.available = '1' and insuranceinfo.status = '0' ").then(function (resp) {
      return resp;
    });
}

async function queryWaitForQuote(ctx, next) {
  let data = await queryWaitForQuoteFun();
  ctx.state.data = data[0];
}

module.exports = {
  insert, update, queryByOpenid, queryList, queryWaitForQuote
}