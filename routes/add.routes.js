const {Router} = require('express')
const {addPageController, addPostController} = require('../controllers/add.controllers')
const {productValidators} = require('../utils/validators.utils')
const AuthMiddleware = require('../middleware/authorization.middleware')
const router = Router()

router.get('/', AuthMiddleware, addPageController)
router.post('/', AuthMiddleware, productValidators, addPostController)

module.exports = router
