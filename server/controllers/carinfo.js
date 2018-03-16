const { mysql } = require('../qcloud')

function insertCarInfo(idCardNo, carNo, phoneNo,openid) {
  return mysql.select('*')
    .from('carinfo')
    .where({
      idcardno: idCardNo,
      carno: carNo,
      phoneno: phoneNo,
      openid: openid
    }).then(function (rows) {
      if (rows.length == 0) {
        return mysql.insert({ 
          idcardno: idCardNo,
          carno: carNo,
          phoneno: phoneNo,
          openid: openid,
          createdate: new Date().getTime()
          }, 'id').into('carinfo');
      }else{
        return [rows[0].id];
      }
    });
}

function updateCarInfo(carInfo) {
  let updateCarInfoObj = {};
  if (carInfo.carno) {
    updateCarInfoObj.carno = carInfo.carno;
  }
  if (carInfo.idcardno) {
    updateCarInfoObj.idcardno = carInfo.idcardno;
  }
  if (carInfo.phoneno) {
    updateCarInfoObj.phoneno = carInfo.phoneno;
  }
  if (carInfo.available) {
    updateCarInfoObj.available = carInfo.available;
  }

  updateCarInfoObj.updatedate = new Date().getTime();

  return mysql('carinfo')
    .where('id', '=', carInfo.id)
    .update(updateCarInfoObj)
}

function queryCarList(openid) {
  let sql = "select id,idcardno,carno,phoneno,FROM_UNIXTIME(carinfo.createdate/1000, '%Y-%m-%d %H:%i:%s') createdate from carinfo";
  if (openid) {
    return mysql.raw(sql + " where openid = ? and carinfo.available = '1' order by createdate desc ", openid).then(function (resp) {
      return resp;
    });
  } else {
    return mysql.raw(sql + " where carinfo.available = '1' ").then(function (resp) {
      return resp;
    });
  }
}

/**
 * 响应 GET 请求（插入车辆信息并返回插入状态）
 */
async function insert(ctx, next) {
  const { idCardNo, carNo, phoneNo, openid } = ctx.query
  let data = await insertCarInfo(idCardNo, carNo, phoneNo, openid);
  ctx.state.data = { id: data[0] };
}

async function update(ctx, next) {
  const carInfo = ctx.request.body;
  let data = await updateCarInfo(carInfo);
  ctx.state.data = data;
}

async function queryList(ctx, next) {
  let data = await queryCarList();
  ctx.state.data = data[0];
}

async function queryByOpenid(ctx, next) {
  const { openid } = ctx.query
  let data = await queryCarList(openid);
  ctx.state.data = data[0];
}

module.exports = {
  insert,update, queryByOpenid, queryList
}