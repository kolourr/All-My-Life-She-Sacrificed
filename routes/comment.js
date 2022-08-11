const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment') 
const { ensureAuth } = require('../middleware/auth')

router.post('/:id/createComment', ensureAuth, commentController.createComment)

module.exports = router