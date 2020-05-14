const mongoose = require('mongoose')

const {Schema, model} = mongoose

const userSchema = new Schema({
  name: {type: String, required: true},
  password: {type: String, required: true, select: false} // 不允许密码暴露
})

// 使用model声明
module.exports = model('User', userSchema)