const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const homeController = require('../controllers/home')

router.get('/', homeController.getHome) 
router.get('/profile', ensureAuth, homeController.getProfile) 
router.get('/editButton', ensureAuth, homeController.editProfileButton) 
router.put('/editProfile', ensureAuth, homeController.editProfile) 

 



router.get('/loggedinindex', ensureAuth, homeController.getHomeLoggedIn) 
router.get('/updatedindex', ensureAuth, homeController.updatedindex)
router.get('/about',  homeController.about) 
router.get('/cover',  homeController.cover) 
router.get('/termsofuse',  homeController.termsofuse) 
router.get('/privacypolicy',  homeController.privacypolicy) 
router.get('/error/404',  homeController.error404) 
router.get('/error/500',  homeController.error500) 


module.exports = router