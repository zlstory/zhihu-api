const fs = require('fs') // node内置文件管理模块

// 批量注册路由功能
module.exports = (app) => {
  fs.readdirSync(__dirname).forEach(file => {
    if(file === 'index.js') return
    const route = require(`./${file}`)
    // 注册-支持options请求
    app.use(route.routes()).use(route.allowedMethods())
  })
}