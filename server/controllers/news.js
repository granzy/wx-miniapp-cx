const { mysql } = require('../qcloud')


function insertNews(title, content, tbr, previewimage) {
  return mysql.insert({
    title: title || '',
    content: content || '',
    tbr: tbr || '',
    previewimage: previewimage || '',
    createdate: new Date().getTime()
  }, 'id').into('news');
}

function updateNews(news) {
  news.updatedate = new Date().getTime();
  return mysql('news')
    .where('id', '=', news.id)
    .update(news)
}

function queryNews(newsId) {
  let sql = "select id,title,content,tbr,previewimage,FROM_UNIXTIME(createdate/1000, '%Y-%m-%d %H:%i:%s') createdate from news ";
  if (newsId) {
    return mysql.raw(sql + " where id = ?", newsId).then(function (resp) {
      return resp;
    });
  } else {
    return mysql.raw(sql + " where available='1' ").then(function (resp) {
      return resp;
    });
  }
}

function queryNewsByLimit(from,size){
  let sql = "select id,title,content,tbr,previewimage,FROM_UNIXTIME(createdate/1000, '%Y-%m-%d %H:%i:%s') createdate from news order by createdate desc ";
  return mysql.raw(sql + " limit ?,?", [parseInt(from), parseInt(size)]).then(function (resp) {
    return resp;
  });
}

async function queryList(ctx, next) {
  let data = await queryNews();
  ctx.state.data = data[0];
}

async function queryNewsById(ctx, next) {
  const { id } = ctx.query
  let data = await queryNews(id);
  ctx.state.data = data[0];
}

async function queryListByLimit(ctx, next) {
  const { from,size } = ctx.query
  let data = await queryNewsByLimit(from, size);
  ctx.state.data = data[0];
}

async function insert(ctx, next) {
  const { title, content, tbr, previewimage} = ctx.request.body
  let data = await insertNews(title, content, tbr, previewimage);
  ctx.state.data = { id: data[0] };
}

async function update(ctx, next) {
  const news = ctx.request.body;
  let data = await updateNews(news);
  ctx.state.data = { id: data };
}

module.exports = {
  insert, update, queryList, queryListByLimit, queryNewsById
}