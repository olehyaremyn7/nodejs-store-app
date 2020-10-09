const {Router} = require('express')
const {homePageController,
        aboutPageController,
        searchController} = require('../controllers/home.controllers')
const router = Router()

router.get('/', homePageController)
router.get('/about', aboutPageController)
router.get('/search', searchController)

module.exports = router
