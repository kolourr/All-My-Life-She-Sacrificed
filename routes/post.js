const express = require('express')
const router = express.Router()
const postController = require('../controllers/post') 
const { ensureAuth } = require('../middleware/auth')



router.get('/allPosts', ensureAuth, postController.allPosts)

router.get('/userData', ensureAuth, postController.userData)


router.post('/createPost', ensureAuth, postController.createPost)

// router.put('/updatePost', ensureAuth, postController.updatePost)

// router.put('/updateHearts', ensureAuth, postController.updateHearts)

// router.put('/updateHeartBreaks', ensureAuth, postController.updateHeartBreaks) 

// router.delete('/deletePost', ensureAuth, postController.deletePost)

module.exports = router