const { mysql } = require('../qcloud')

 function getData() {
   return mysql.select('*')
     .from('carousel');
}

module.exports =async ctx =>  {
  //console.log(await getData())
  let data = await getData();
  //return data;
  ctx.state.data = { msg: 'Hello World' + JSON.stringify(data)}
}