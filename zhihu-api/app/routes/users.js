const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({ prefix: '/users' })
const { find, create, findById, update, delete: del, login, checkOwner } = require('../controllers/users')
const { secret } = require('../config')

const auth = jwt({ secret })

router.get('/', find)

// 增
router.post('/', create)

// 删
router.delete('/:id', auth, checkOwner, del)

// 改
router.patch('/:id', auth, checkOwner, update)

// 查
router.get('/:id', findById)

// 登录
router.post('/login', login)

module.exports = router;