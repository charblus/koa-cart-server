const Koa = require('koa'),
  Router = require('koa-router'),
  cheerio = require('cheerio'),
  charset = require('superagent-charset'),
  superagent = charset(require('superagent')),
  app = new Koa(),
  router = new Router();
var result;

handleCart = (url) => {
  superagent.get(url)
    .buffer(true)
    .end(async (err, data) => { //页面获取到的数据
      let html = data.text,

        $ = cheerio.load(html, {
          decodeEntities: false,
          ignoreWhitespace: false,
          xmlMode: false,
          lowerCaseTags: false
        }); //用cheerio解析页面数据
/**
 *  只分析爬一个内容页面
 * 
 *  */

        $('#wrapper #main').find('#content p').empty()
        $('#wrapper #main').find('#content div[align = center]').empty()
        let str = '手机用户请浏览阅读，更优质的阅读体验。'
        var reg = new RegExp(str, 'g')
        // .replace(/\&nbsp;/g, '')
        var rStr = $('#wrapper #main').find('#content').text().replace(reg, '')
        result = rStr

    });
}
router.get('/', (ctx, next) => {
  let url = `https://www.bequgezw.com/5/5274/69046.html`;
  handleCart(url)

  ctx.body = result;
  // ctx.body = 'xiaoyaochaoer cartoon'

})

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3010, () => {
  console.log('[服务已开启,访问地址为：] http://127.0.0.1:3010/');
});
