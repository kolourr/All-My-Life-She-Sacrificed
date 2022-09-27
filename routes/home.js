const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const homeController = require('../controllers/home')
const upload = require("../middleware/upload");


router.get('/', homeController.getHome)
router.get('/profile', ensureAuth, homeController.getProfile)
router.get('/editButton', ensureAuth, homeController.editProfileButton)
router.post('/editProfile/:id', upload.single('image'), ensureAuth, homeController.editProfile)
router.post('/editProfilePicture', ensureAuth, homeController.editProfilePicture)

router.get('/message',  homeController.message)
router.post('/sendmessage',  homeController.sendmessage)
router.get('/messageSentSuccessfully',  homeController.messageSentSuccessfully)
router.post('/subscribe',  homeController.subscribe)

router.get('/mothersday', ensureAuth, homeController.mothersday)
router.get('/mothersdayfailure', ensureAuth, homeController.mothersdayfailure)
router.get('/mothersdaysuccess', ensureAuth, homeController.mothersdaysuccess)

router.post('/create-checkout-session', ensureAuth, homeController.createcheckoutsession)



router.get('/loggedinindex', ensureAuth, homeController.getHomeLoggedIn)
router.get('/updatedindex', ensureAuth, homeController.updatedindex)
router.get('/login',  homeController.login)
router.get('/about',  homeController.about)
router.get('/nft',  homeController.nft)
router.get('/song',  homeController.song)
router.get('/termsofuse',  homeController.termsofuse)
router.get('/privacypolicy',  homeController.privacypolicy)
router.get('/error/404',  homeController.error404)
router.get('/error/500',  homeController.error500)


module.exports = router