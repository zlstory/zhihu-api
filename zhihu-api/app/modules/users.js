const mongoose = require('mongoose')

const {Schema, model} = mongoose

const userSchema = new Schema({
  name: {type: String, required: true}
})

// 使用model声明
module.exports = model('User', userSchema)