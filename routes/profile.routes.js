const {Router} = require('express')
const AuthMiddleware = require('../middleware/authorization.middleware')
const {profilePageController, profilePostController} = require('../controllers/profile.controllers')
const router = Router()

router.get('/', AuthMiddleware, profilePageController)
router.post('/', AuthMiddleware, profilePostController)

module.exports = router
