const jsonwebtoken = require('jsonwebtoken')
const User = require('../modules/users')
const { secret } = require('../config')

class UserCtl {
  async find(ctx) {
    ctx.body = await User.find()
  }
  async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true }
    })
    // 在创建用户的时候，防止用户名相同
    const { name } = ctx.request.body
    const repeatedUser = await User.findOne({ name })
    if (repeatedUser) {
      ctx.throw(409, '该用户名已经被占用')
    }

    const user = await new User(ctx.request.body).save();
    ctx.body = user
  }
  async findById(ctx) {
    const user = await User.findById(ctx.params.id)
    if (!user) { // 如果id不存在
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user
  }

  // 检查是否为拥有者:授权
  async checkOwner(ctx, next){
    if(ctx.params.id !== ctx.state.user._id){
      ctx.throw(403, '暂无权限')
    }
    await next()
  }
  
  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      password: { type: 'string', required: false }
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) { // 如果id不存在
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user
  }
  async delete(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id)
    if (!user) { // 如果id不存在
      ctx.throw(404, '用户不存在')
    }
    ctx.status = 204
  }

  async login(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true }
    })
    const user = await User.findOne(ctx.request.body)
    if (!user) {
      ctx.throw(401, '用户名或密码不正确')
    }
    const { _id, name } = user
    // 生成令牌
    const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1d' }) // 设置一天有效期
    ctx.body = { token }
  }
}
module.exports = new UserCtl()