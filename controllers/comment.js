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


  commentHeartIncreaseDecreaseID: async (req, res) => {
    try {
      let comment = await Comments.find({
        _id: req.body.commentHeartIncreaseDecreaseID,
      });
      let check;
      comment.forEach((com) => {
        check = com.heart.includes(req.user.loginID);
      });

      if (!check) {
        await Comments.findOneAndUpdate(
          {
            _id: req.body.commentHeartIncreaseDecreaseID,
          },
          {
            $push: {
              heart: req.user.loginID,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );

        console.log(
          `Comment ${req.body.commentHeartIncreaseDecreaseID} heart's increased`
        );
      } else {
        await Comments.findOneAndUpdate(
          {
            _id: req.body.commentHeartIncreaseDecreaseID,
          },
          {
            $pull: {
              heart: req.user.loginID,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        console.log(
          `Comment ${req.body.commentHeartIncreaseDecreaseID} heart's decreased`
        );
      }

      res.json(`Post ${req.body.commentHeartIncreaseDecreaseID} heart's updated`);
    } catch (err) {
      console.log(err);
      res.render("error/500");
    }
  },

  commentHeartBreakIncreaseDecreaseID: async (req, res) => {
    try {
      let comment = await Comments.find({
        _id: req.body.commentHeartBreakIncreaseDecreaseID,
      });
      let check;
      comment.forEach((com) => {
        check = com.heartBreak.includes(req.user.loginID);
      });

      if (!check) {
        await Comments.findOneAndUpdate(
          {
            _id: req.body.commentHeartBreakIncreaseDecreaseID,
          },
          {
            $push: {
              heartBreak: req.user.loginID,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );

        console.log(
          `Comment ${req.body.commentHeartBreakIncreaseDecreaseID} heartbreak's increased`
        );
      } else {
        await Comments.findOneAndUpdate(
          {
            _id: req.body.commentHeartBreakIncreaseDecreaseID,
          },
          {
            $pull: {
              heartBreak: req.user.loginID,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        console.log(
          `Comment ${req.body.commentHeartBreakIncreaseDecreaseID} heartbreak's decreased`
        );
      }

      

      res.json(
        `Comment ${req.body.commentHeartBreakIncreaseDecreaseID} heartbreak's updated`
      );
    } catch (err) {
      console.log(err);
      res.render("error/500");
    }
  },



}