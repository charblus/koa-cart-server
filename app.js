const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('koa-jwt')

const index = require('./routes/index')
const users = require('./routes/users')

var mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/carts'
mongoose.connect(DB_URL, { //mongoose.connect
  useNewUrlParser: true
});
// MongoDB连接成功后回调，这里仅输出一行日志
mongoose.connection.on('connected', function () { //mongoose.connection
  console.log('sucess 192.168.1.29:27017/carts');
});

// MongoDB连接出错后回调，这里仅输出一行日志
mongoose.connection.on('error', function (err) {
  console.log(' error: ' + err);
});

// MongoDB连接断开后回调，这里仅输出一行日志
mongoose.connection.on('disconnected', function () {
  console.log(' disconnected');
});

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

//koa-jwt 路由鉴权
// app.use(errorHandle)
app.use(jwt({
  secret: 'secret'
}).unless({
  path: [/\/register/, /\/login/]
}))

module.exports = app
