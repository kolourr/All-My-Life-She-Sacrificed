const express = require('express')
const router = express.Router()
const postController = require('../controllers/post') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, postController.getTodos)

router.post('/createTodo', postController.createTodo)

router.put('/markComplete', postController.markComplete)

router.put('/markIncomplete', postController.markIncomplete)

router.delete('/deleteTodo', postController.deleteTodo)

module.exports = router