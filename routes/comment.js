const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment') 
const { ensureAuth } = require('../middleware/auth')

// router.get('/userComments', ensureAuth, commentController.userPosts)

module.exports = router