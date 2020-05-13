const Router = require('koa-router')
const router = new Router({ prefix: '/users'})
const {find, create, findById, update, delete:del} = require('../controllers/users')

router.get('/', find)

// 增
router.post('/', create)

// 删
router.delete('/:id',del)

// 改
router.put('/:id', update)

// 查
router.get('/:id', findById)

module.exports = router;