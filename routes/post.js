const express = require('express')
const router = express.Router()
const postController = require('../controllers/post') 
const { ensureAuth } = require('../middleware/auth')

router.get('/dashboard', ensureAuth, postController.dashboard) 

router.post('/createPost', ensureAuth, postController.createPost)

router.delete('/deletePost', ensureAuth, postController.deletePost)

router.get('/editButton/:id', ensureAuth, postController.editButton)

router.put('/editPost/:id', ensureAuth, postController.editPost)

router.put('/postHeartIncreaseDecreaseID', ensureAuth, postController.postHeartIncreaseDecreaseID) 

router.put('/postHeartBreakIncreaseDecreaseID', ensureAuth, postController.postHeartBreakIncreaseDecreaseID) 




module.exports = router