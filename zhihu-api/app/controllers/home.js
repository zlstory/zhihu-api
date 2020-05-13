// 中间件的本质就是函数
class HomeCtl {
  index(ctx) {
    ctx.body = '这是主页'
  }
}

module.exports = new HomeCtl()