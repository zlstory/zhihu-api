const User = require('../modules/users')

class UserCtl {
  async find(ctx) {
    ctx.body = await User.find()
  }
  async create(ctx) {
    ctx.verifyParams({
        name: { type: 'string', required: true }
      })
    const user = await new User(ctx.request.body).save();
    ctx.body = user
  }
  async findById(ctx) {
   const user = await User.findById(ctx.params.id)
   if(!user){ // 如果id不存在
     ctx.throw(404, '用户不存在')
   }
   ctx.body = user
  }
  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true }
    })
    const user = await User.findByIdAndUpdate(ctx.params.id,ctx.request.body)
    if(!user){ // 如果id不存在
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user
  }
 async delete(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id)
    if(!user){ // 如果id不存在
      ctx.throw(404, '用户不存在')
    }
    ctx.status = 204
  }

}
module.exports = new UserCtl()