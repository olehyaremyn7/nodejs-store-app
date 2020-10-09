const {Router} = require('express')
const {ordersPageController, ordersPostController} = require('../controllers/orders.controllers')
const AuthMiddleware = require('../middleware/authorization.middleware')
const router = Router()

router.get('/', AuthMiddleware, ordersPageController)
router.post('/', AuthMiddleware, ordersPostController)

module.exports = router
