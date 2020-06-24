const router = require('koa-router')()
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const user = require('../models/userinfo')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})
router.post('/ll',async (ctx) => {
  ctx.body = ctx.request.body
});
router.post('/login', async (ctx, next) => {
  console.log('tk', ctx.request.header.token)
  const userinfos = await user.findOne({
    username: ctx.request.body.username
  })
  const compare = await bcrypt.compare(ctx.request.body.password, userinfos.password)

  if (compare) {
    ctx.body = {
      code: 200,
      msg: '登录成功！',
      token: jsonwebtoken.sign({
        data: userinfos.username,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
      }, 'secret')
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '登录失败！'
    }
  }
})

//注册
router.post('/register', async (ctx, next) => {
  //判断和唯一识别码
  // ctx.body = ctx.request.body
  const {
    body
  } = ctx.request

  body.password = await bcrypt.hash(ctx.request.body.password, 10)
  const res = await user.create(body)

  if (res) {
    ctx.body = {
      code: 1,
      msg: '注册成功！'
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '注册失败！'
    }
  }
})


module.exports = router
