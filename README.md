


### 启动项目
```
```shell
mongod --config /usr/local/etc/mongod.conf

npm run dev
```


### koa2脚手架koa-generator创建项目
1. koa-generator的安装 `npm install -g koa-generator`

2. 生成基本的项目架构。
* 构建koa1.x的版本项目
`koa koa-demo`
* 构建koa2.x的版本项目  (推荐)
`koa2 koa-demo`

* 参数
`-- nunjucks` 选择渲染模板  
`-- git` 生成 .gitignore

如： `koa2 koa-demo --nunjucks --git`

3. 访问地址localhost:3000

4. app.js 连接mongodb 和 /models 下添加数据模型集合 
5. 路由配置 写入逻辑代码

### 知识篇
> 看到较多的中间件，中间件的执行顺序是从外到内，再从内到外，也就是洋葱模式。中间件的执行过程是依靠app.use()进行传递的，你可以简单的理解为自己编写的函数，依次去执行即可。每一个中间件会在app调用是传入2个参数，分别为： `ctx`和`next`


```js
ctx:  
Koa Context 将 node 的 request 和 response 对象封装在一个单独的对象里面，其为编写 web 应用和 API 提供了很多有用的方法。
这些操作在HTTP服务器开发中经常使用，因此其被添加在上下文这一层，而不是更高层框架中，因此将迫使中间件需要重新实现这些常用方法。

next： 
下一个中间件函数，也就是每一个中间件如果要往下走必须写上这个，否则无法执行。
可以理解为前端的vue-Router中的路由守卫中的next(), 执行下一步或者进行传参。
```
> 该文件中需要引入其他中间件，可以先引入相关的中间件 (理解参照 ./模块化.md)


### 第三方中间件
1. bcrypt 加密算法 
`npm i bcrypt`

> `bcrypt.hash(ctx.request.body.password, 10)` 生成token；
**JSON Web Token的结构**
`aaaaaa.bbbbbb.cccccc` ===> Header.payload.Signature

* Header --  header典型的由两部分组成：token的类型（“JWT”）和算法名称（比如：HMAC SHA256或者RSA等等）。
* payload -- JWT的第二部分是payload，它包含声明（要求）。声明是关于实体(通常是用户)和其他数据的声明。
* Signature -- 为了得到签名部分，你必须有编码过的header、编码过的payload、一个秘钥，签名算法是header中指定的那个，然对它们签名即可

> JWT是什么：JWT的声明一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息

2. `jsonwebtoken`就可以实现token的生成与反向解密出用户数据
[jsonwebtoken生成与解析token](https://www.jianshu.com/p/ed17e00c4484)