const User = require('../models/user')
const Post = require('../models/post')
const Comments = require('../models/comment')


module.exports = {
createComment: async (req, res) => {
    try {
     let comment =  await Comments.create({
            body: req.body.body,
            heart: req.body.heart,
            heartBreak: req.body.heartBreak,
            post: req.params.id,
            loginID: req.user.loginID
          })
    await comment.save()
    let post = await Post.findById({
        _id: req.params.id,
      }).lean()

    post.comments.push(comment)

      console.log(`Comment added to post ${req.params.id}`)
      res.redirect('/loggedinindex')
    } catch (err) {
      console.log(err)
      res.render('error/500')
    }
  },

  deleteComment: async (req, res) => {
    try {
      await Comments.findOneAndDelete({
        _id: req.body.deleteCommentID
      })
      console.log('Deleted Comment')
      res.json('Deleted Comment')

    } catch (err) {
      console.log(err)
      res.render('error/500')
    }
  },

  editCommentButton: async (req, res) => {
    try {

      let comment = await Comments.findById({
        _id: req.params.id,
      }).lean()
      let allPosts = await Post.find({}).lean()

      if (!comment) {
        return res.render('error/404')
      }

      if (comment.loginID !== req.user.loginID) {
        res.redirect('/post/dashboard')
      } else {}
      res.render('editComment', {
        comment: comment,
        allPosts: allPosts,
      })

    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  },

  editComment: async (req, res) => {
    try {
      let comment = await Comments.findOne({
        _id: req.params.id,
      }).lean()

      if (!comment) {
        return res.render('error/404')
      }

      if (comment.loginID !== req.user.loginID) {
        res.redirect('/post/dashboard')
      } else {
        comment = await Comments.findOneAndUpdate({
          _id: req.params.id
        }, req.body, {
          new: true,
          runValidators: true,
        })
        res.redirect('/post/dashboard')
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  },



}