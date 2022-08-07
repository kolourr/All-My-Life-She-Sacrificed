const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const homeController = require('../controllers/home')

router.get('/', ensureGuest, homeController.getHome) 
router.get('/dashboard', ensureAuth, homeController.dashboard) 
router.get('/updatedindex', ensureAuth, homeController.updatedindex)
router.get('/about',  homeController.about) 
router.get('/cover',  homeController.cover) 
router.get('/termsofuse',  homeController.termsofuse) 
router.get('/privacypolicy',  homeController.privacypolicy) 
router.get('/error/404',  homeController.error404) 
router.get('/error/500',  homeController.error500) 


module.exports = router