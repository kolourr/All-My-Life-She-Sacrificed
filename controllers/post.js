const User = require('../models/user')
const Post = require('../models/post')
const Comments = require('../models/comment')


module.exports = {
  dashboard: async (req, res) => {
    try {
      let allUserPosts = await Post.find({
        loginID: req.user.loginID
      })
      let postsWithUserComments = await Comments.find({
        loginID: req.user.loginID
      }).populate('post')
   
      res.render('dashboard.ejs', {
        allUserPosts, 
        postsWithUserComments,
         
      })
    } catch (err) {
      console.log(err)
      res.render('error/500')
    }
  },

  createPost: async (req, res) => {
    try {
      await Post.create({
        title: req.body.title,
        body: req.body.body,
        postType: req.body.postType,
        heart: req.body.heart,
        heartBreak: req.body.heartBreak,
        loginID: req.user.loginID,
        heartIncrement: true,
        heartBreakIncrement: true,
      })
      console.log('Post created')
      res.redirect('/updatedindex')
    } catch (err) {
      console.log(err)
      res.render('error/500')
    }
  },

  deletePost: async (req, res) => {
    try {
      await Post.findOneAndDelete({
        _id: req.body.deletePostID
      })

      await Comments.deleteMany({
        post: req.body.deletePostID
      })

      console.log('Deleted Post and all its Comments')
      res.json('Deleted Post and all its Comments')

    } catch (err) {
      console.log(err)
      res.render('error/500')
    }
  },

  editButton: async (req, res) => {
    try {

      let post = await Post.findById({
        _id: req.params.id,
      }).lean()
  
      if (!post) {
        return res.render('error/404')
      }

      if (post.loginID !== req.user.loginID) {
        res.redirect('/post/dashboard')
      } else {}
      res.render('editPost', {
        post
      })

    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  },

  editPost: async (req, res) => {
    try {
      let post = await Post.findOne({
        _id: req.params.id,
      }).lean()

      if (!post) {
        return res.render('error/404')
      }

      if (post.loginID !== req.user.loginID) {
        res.redirect('/post/dashboard')
      } else {
        post = await Post.findOneAndUpdate({
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

  postHeartDecrease: async (req, res) => {
    try {
      
      await Post.findOneAndUpdate({
        _id: req.body.decreasePostHeartID,
      },  
      {
        $inc: {heart: -1},
        heartIncrement: true,
      }, 
        {
        new: true,
        runValidators: true,
      })
       console.log(`Post ${req.body.decreasePostHeartID} heart's decreased`)
      res.json(`Post ${req.body.decreasePostHeartID} heart's decreased`)

    } catch (err) {
      console.log(err)
      res.render('error/500')
    }
  },

  postHeartIncrease: async (req, res) => {
    try {

      await Post.findOneAndUpdate({
        _id: req.body.increasePostHeartID,
      },      
      {$inc: {heart: +1},
      heartIncrement: false},
        {
        new: true,
        runValidators: true,
      })

       console.log(`Post ${req.body.increasePostHeartID} heart's increased`)
      res.json(`Post ${req.body.increasePostHeartID} heart's increased`)

    } catch (err) {
      console.log(err)
      res.render('error/500')
    }
  },


}   

 