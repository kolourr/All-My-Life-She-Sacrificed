const express = require('express')
const router = express.Router()
const wallController = require('../controllers/wall') 
const { ensureAuth } = require('../middleware/auth')
const upload = require("../middleware/upload"); 

router.get('/', ensureAuth, wallController.getHome) 


router.get('/create', ensureAuth, wallController.create) 

router.post('/createWallPost', ensureAuth, wallController.createWallPost)

router.delete('/deleteWallPost', ensureAuth, wallController.deleteWallPost)

router.get('/editWallPostButton/:id', ensureAuth, wallController.editWallPostButton)

// router.post('/editWallPost/:id', upload.single('updatedimage'), ensureAuth, wallController.editWallPost)

router.get('/feed', ensureAuth, wallController.feed) 

router.get('/:id', ensureAuth, wallController.getWallPost) 

router.post('/:id/createComment',   ensureAuth, wallController.createComment)

router.put('/wallPostHeartIncreaseDecreaseID', ensureAuth, wallController.wallPostHeartIncreaseDecreaseID) 

router.put('/wallPostHeartBreakIncreaseDecreaseID', ensureAuth, wallController.wallPostHeartBreakIncreaseDecreaseID) 


router.put('/wallPostCommentHeartIncreaseDecreaseID', ensureAuth, wallController.wallPostCommentHeartIncreaseDecreaseID) 

router.put('/wallPostCommentHeartBreakIncreaseDecreaseID', ensureAuth, wallController.wallPostCommentHeartBreakIncreaseDecreaseID) 


module.exports = router