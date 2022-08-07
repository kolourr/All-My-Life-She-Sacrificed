const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment') 
const { ensureAuth } = require('../middleware/auth')

// router.get('/userComments', ensureAuth, commentController.userPosts)

// router.get('/userCommentsReceived', ensureAuth, commentController.allPosts)

// router.get('/userCommentsHearts', ensureAuth, commentController.userPostsHearts)

// router.get('/userCommentsHeartBreaks', ensureAuth, commentController.userPostsHeartBreaks)

// router.post('/createComment', ensureAuth, commentController.createPost)

// router.put('/updateComment', ensureAuth, commentController.updatePost)

// router.put('/updateHearts', ensureAuth, commentController.updateHearts)

// router.put('/updateHeartBreaks', ensureAuth, commentController.updateHeartBreaks)

// router.delete('/deleteComment', ensureAuth, commentController.deletePost)

module.exports = router