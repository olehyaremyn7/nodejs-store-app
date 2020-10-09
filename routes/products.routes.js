const {Router} = require('express')
const {productsPageController,
        productPageController, 
        productEditController,
        productEditPostController,
        productRemoveController} = require('../controllers/products.controllers')
const {productValidators} = require('../utils/validators.utils')
const AuthMiddleware = require('../middleware/authorization.middleware')
const router = Router()

router.get('/', productsPageController)
router.get('/:id', productPageController)
router.get('/:id/edit', AuthMiddleware, productEditController)
router.post('/edit', AuthMiddleware, productValidators, productEditPostController)
router.post('/remove', AuthMiddleware, productRemoveController)

module.exports = router
