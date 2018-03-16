const { mysql } = require('../qcloud')

function updatePhoneNumber(phonenumber) {
  return mysql.select('*')
    .from('servicenumber').then(function (rows) {
      if (rows.length == 0) {
        return mysql.insert({
          phonenumber: phonenumber,
          createdate: new Date().getTime()
        }, 'id').into('servicenumber');
      } else {
        let id = rows[0].id;
        let data = mysql('servicenumber')
          .where('id', '=', id)
          .update({
            phonenumber: phonenumber,
            updatedate: new Date().getTime()
          });
        return data; 
      }
    });
}

function queryServiceNumberFun() {
  let sql = "select servicenumber.phonenumber from servicenumber limit 1";
  return mysql.raw(sql).then(function (resp) {
    return resp;
  });
}

async function queryServiceNumber(ctx, next) {
  let data = await queryServiceNumberFun();
  ctx.state.data = data[0];
}

async function update(ctx, next) {
  const { phonenumber } = ctx.request.body
  let data = await updatePhoneNumber(phonenumber);
  if (data instanceof Array){
    ctx.state.data = { res: data[0] };
  }else{
    ctx.state.data = { res: data };
  }  
}

module.exports = {
  update, queryServiceNumber
}