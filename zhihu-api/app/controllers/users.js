const User = require('../modules/users')

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
    const {name} = ctx.request.body
    const repeatedUser = await User.findOne({name})
    if(repeatedUser){
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

}
module.exports = new UserCtl()