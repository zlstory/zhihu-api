const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const error = require('koa-json-error')
const parammter = require('koa-parameter')
const mongoose = require('mongoose')

const app = new Koa()
const routing = require('./routes')

const {connectionStr} = require('./config')

mongoose.connect(connectionStr,{ useUnifiedTopology: true }, ()=>{
  console.log('连接成功')
})
mongoose.connection.on('error', console.error)

// 错误处理中间件，需要写在所有中间件最前面
app.use(error({
  postFormat: (e, {stack, ...rest}) =>  process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
  }
))


app.use(bodyparser())
// 处理请求参数: 全局方法
app.use(parammter(app))

//注册路由
routing(app)

app.listen(3000, () => {
  console.log('程序启动在3000端口')
})

