const {Router} = require('express')
const {cartPageController,
        cartAddController,
        cartDeleteController} = require('../controllers/cart.controllers')
const AuthMiddleware = require('../middleware/authorization.middleware')
const router = Router()

router.get('/', AuthMiddleware, cartPageController)
router.post('/add', AuthMiddleware, cartAddController)
router.delete('/remove/:id', AuthMiddleware, cartDeleteController)

module.exports = router
