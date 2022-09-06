const express = require('express')
const router = express.Router()
const wallController = require('../controllers/wall') 
const { ensureAuth } = require('../middleware/auth')
const upload = require("../middleware/upload"); 

router.get('/', ensureAuth, wallController.getHome) 


router.get('/create', ensureAuth, wallController.create) 

router.post('/createWallPost', upload.single('image'), ensureAuth, wallController.createWallPost)

// router.delete('/deletePost', ensureAuth, wallController.deletePost)

// router.get('/editButton/:id', ensureAuth, wallController.editButton)

// router.put('/editPost/:id', ensureAuth, wallController.editPost)

// router.put('/postHeartIncreaseDecreaseID', ensureAuth, wallController.postHeartIncreaseDecreaseID) 

// router.put('/postHeartBreakIncreaseDecreaseID', ensureAuth, wallController.postHeartBreakIncreaseDecreaseID) 


module.exports = router