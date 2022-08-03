const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const homeController = require('../controllers/home')

router.get('/dashboard', ensureGuest, homeController.getHome) 
router.get('/about', ensureGuest, homeController.about) 
router.get('/cover', ensureGuest, homeController.cover) 
router.get('/termsofuse', ensureGuest, homeController.termsofuse) 
router.get('/privacypolicy', ensureGuest, homeController.privacypolicy) 
router.get('/error/404', ensureGuest, homeController.error404) 
router.get('/error/500', ensureGuest, homeController.error500) 


module.exports = router