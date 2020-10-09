const {Router} = require('express')
const {registerValidators, loginValidators} = require('../utils/validators.utils')
const {authorizationPageController,
        logoutController,
        loginPostController,
        registrationPostController,
        resetController,
        resetPostController,
        newPasswordController,
        newPasswordPostController} = require('../controllers/authorization.controllers')
const router = Router()

router.get('/', authorizationPageController)
router.get('/logout', logoutController)
router.post('/login', loginValidators, loginPostController)
router.post('/registration', registerValidators, registrationPostController)
router.get('/reset', resetController)
router.post('/reset', resetPostController)
router.get('/password/:token', newPasswordController)
router.post('/password', newPasswordPostController)

module.exports = router
