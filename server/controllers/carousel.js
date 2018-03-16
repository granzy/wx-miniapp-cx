const { mysql } = require('../qcloud')

function insertCarousel(order, tbr, url) {
  return mysql.insert({
    order: order || '',
    url: url || '',
    tbr: tbr || '',
    createdate: new Date().getTime()
  }, 'id').into('carousel');
}

function updateCarousel(carousel) {
  carousel.updatedate = new Date().getTime();
  return mysql('carousel')
    .where('id', '=', carousel.id)
    .update(carousel)
}

function queryCarousel(carouselId) {
  let sql = "select id,carousel.order,tbr,url,FROM_UNIXTIME(createdate/1000, '%Y-%m-%d %H:%i:%s') createdate from carousel ";
  if (carouselId) {
    return mysql.raw(sql + " where id = ?", carouselId).then(function (resp) {
      return resp;
    });
  } else {
    return mysql.raw(sql + "where available='1' order by carousel.order asc").then(function (resp) {
      return resp;
    });
  }
}

async function queryList(ctx, next) {
  let data = await queryCarousel();
  ctx.state.data = data[0];
}

async function insert(ctx, next) {
  const { order, tbr, url } = ctx.request.body
  let data = await insertCarousel(order, tbr, url);
  ctx.state.data = {id:data[0]};
}

async function update(ctx, next) {
  const carousel = ctx.request.body;
  let data = await updateCarousel(carousel);
  ctx.state.data = { id: data };
}


module.exports = {
  insert, update, queryList
}