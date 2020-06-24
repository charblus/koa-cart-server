const Koa = require('koa'),
  Router = require('koa-router'),
  cheerio = require('cheerio'),
  charset = require('superagent-charset'),
  superagent = charset(require('superagent')),
  app = new Koa(),
  router = new Router();
var result, title;

handleCart = (url, idx) => {
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
      title = '';
      if (err) {
        return;
      }
      title = await $('#wrapper #main').find('.bookname h1').text()
      // console.log(idx, title)
      // main        
      // $('#wrapper #main').find('#content p').empty()
      // $('#wrapper #main').find('#content div[align = center]').empty()
      // let str = '手机用户请浏览阅读，更优质的阅读体验。'
      // var reg = new RegExp(str, 'g')

      // var rStr = $('#wrapper #main').find('#content').text().replace(reg, '')
      // result = rStr

    });
}
// router.get('/', (ctx, next) => {
  var idx = 68776;
  let index = 0;
  clearInterval(timer)
  var timer = setInterval(() => {
  
    let url = `https://www.bequgezw.com/5/5274/${idx}.html`;
    // 此方法使用idx累加 中靶概率太低 获取数据太消耗性能
    handleCart(url,idx)
    if (idx == 31245045){
      clearInterval(timer)
      return;
    }
    console.log(index, idx, title)
    index++;
    idx++;

    
  }, 10)
  

  // ctx.body = result;
  // ctx.body = 'xiaoyaochaoer cartoon'

// })

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3010, () => {
  console.log('[服务已开启,访问地址为：] http://127.0.0.1:3010/');
});
