const Koa = require('koa'),
  Router = require('koa-router'),
  cheerio = require('cheerio'),
  charset = require('superagent-charset'),
  superagent = charset(require('superagent')),
  app = new Koa(),
  router = new Router();
let lintNum, result, html;
// router.get('/', (ctx, next) => {
function EventEval() {
  /**
   * 注：http://www.1kkk.com/vol1-30996/ 网站进行了反爬虫 javascript eval加密了部分重要的html 标签数据
   * 
   * 反反爬虫践行中······  
   * 现在没空 19.7.25
   */
  
  eval(
    function (p, a, c, k, e, d) {
      e = function (c) {
        return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
      };
      if (!''.replace(/^/, String)) {
        while (c--) d[e(c)] = k[c] || e(c);
        k = [function (e) {
          return d[e]
        }];
        e = function () { return '\\w+' };
        c = 1;
      };
      while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
      return p;
    }('0 8=\'\';0 5=\'\'+\'6\'+\'4\'+\'d\'+\'9\'+\'9\'+\'1\'+\'f\'+\'b\'+\'3\'+\'b\'+\'3\'+\'c\'+\'2\'+\'7\'+\'c\'+\'1\';$("#a").e(5);', 16, 16, 'var|||||hihu76h|||guidkey||dm5_key||||val|'.split('|'), 0, {}))


  eval(
    function (p, a, c, k, e, d) {
      e = function (c) {
        return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
      };
      if (!''.replace(/^/, String)) {
        while (c--) d[e(c)] = k[c] || e(c);
        k = [function (e) { return d[e] }];
        e = function () { return '\\w+' }; c = 1;
      };
      while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
      return p;
    }('l 8(){1 5=3;1 4=\'9\';1 6="g://h-j-k-f-a.b.e/d/c/r";1 2=["/q.7","/s.7"];p(1 i=0;i<2.m;i++){2[i]=6+2[i]+\'?5=3&4=9&o=\'}n 2}1 d;d=8();', 29, 29, '|var|pvalue|30996|key|cid|pix|jpg|dm5imagefun|af1edaa7d764e0925f2d4b8444e7b821|99|cdndm5|大圣王||com|50|http|manhua1007||61|174|function|length|return|uk|for|saint_001_001_dccf5cf7|大圣王_vol001|saint_001_002_3fefd889'.split('|'), 0, {}))

}
function handleCart(url) {
  superagent.get(url)
    .buffer(true)
    .end(async (err, data) => { //页面获取到的数据
      html = data.text,

        $ = cheerio.load(html); //用cheerio解析页面数据

      result = html;
      // result = $('#cp_image').attr('id');
      console.log(result)
    });
}

url = `http://www.1kkk.com/vol1-30996/`;
handleCart(url)
// ctx.body = result;





// ctx.body = 'xiaoyaochaoer cartoon'
// })

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3010, () => {
  console.log('[服务已开启,访问地址为：] http://127.0.0.1:3010/');
});

/***
 * 轻松解码类似eval(function(p,a,c,k,e,d){}))的JavaScript代码
 *
 * https://blog.csdn.net/cainiaoxiaozhou/article/details/8960561
 */
