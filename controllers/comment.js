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
}