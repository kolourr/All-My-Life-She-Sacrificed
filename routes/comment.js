const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment') 
const { ensureAuth } = require('../middleware/auth')

router.post('/:id/createComment', ensureAuth, commentController.createComment)

router.delete('/deleteComment', ensureAuth, commentController.deleteComment)

router.get('/editCommentButton/:id', ensureAuth, commentController.editCommentButton)

router.put('/editComment/:id', ensureAuth, commentController.editComment)

router.put('/commentHeartIncreaseDecreaseID', ensureAuth, commentController.commentHeartIncreaseDecreaseID) 

router.put('/commentHeartBreakIncreaseDecreaseID', ensureAuth, commentController.commentHeartBreakIncreaseDecreaseID) 


module.exports = router