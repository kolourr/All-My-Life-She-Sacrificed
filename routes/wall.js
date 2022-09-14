const express = require('express')
const router = express.Router()
const wallController = require('../controllers/wall') 
const { ensureAuth } = require('../middleware/auth')
const upload = require("../middleware/upload"); 

router.get('/', ensureAuth, wallController.getHome) 


router.get('/create', ensureAuth, wallController.create) 

router.post('/createWallPost', upload.single('image'), ensureAuth, wallController.createWallPost)

router.delete('/deleteWallPost', ensureAuth, wallController.deleteWallPost)

router.get('/editWallPostButton/:id', ensureAuth, wallController.editWallPostButton)

router.post('/editWallPost/:id', upload.single('updatedimage'), ensureAuth, wallController.editWallPost)

router.get('/feed', ensureAuth, wallController.feed) 

router.get('/:id', ensureAuth, wallController.getWallPost) 

router.post('/:id/createComment',   ensureAuth, wallController.createComment)



// router.put('/postHeartIncreaseDecreaseID', ensureAuth, wallController.postHeartIncreaseDecreaseID) 

// router.put('/postHeartBreakIncreaseDecreaseID', ensureAuth, wallController.postHeartBreakIncreaseDecreaseID) 


module.exports = router