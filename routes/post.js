const express = require('express')
const router = express.Router()
const postController = require('../controllers/post') 
const { ensureAuth } = require('../middleware/auth')

router.get('/dashboard', ensureAuth, postController.dashboard) 

router.post('/createPost', ensureAuth, postController.createPost)

router.delete('/deletePost', ensureAuth, postController.deletePost)

// router.put('/editPost', ensureAuth, postController.updatePost)


// router.put('/updateHearts', ensureAuth, postController.updateHearts)

// router.put('/updateHeartBreaks', ensureAuth, postController.updateHeartBreaks) 



module.exports = router