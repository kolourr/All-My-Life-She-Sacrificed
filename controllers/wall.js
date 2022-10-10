const User = require("../models/user");
const Wall = require("../models/wall");
const WallComments = require("../models/wallComments");
const upload = require("../middleware/upload");
const imageCompressionUpload = require("../middleware/imageCompressionUpload");
const uploadbase64 = require("../middleware/uploadbase64")



module.exports = {
  getHome: async(req,res)=>{
        try {
            res.render('wall')
        } catch (err) {
            console.log(err)
            res.render('error/500')
        }
    },

    create: async(req,res)=>{
      try {
          res.render('createWallPost')
      } catch (err) {
          console.log(err)
          res.render('error/500')
      }
  },

  createWallPost: async(req,res)=>{
    try {


      let name = Date.now().toString() + Math.floor(Math.random() * 1250) + '.jpg'
      let imageUrl = uploadbase64(req.body.imageBase64, name)

      await Wall.create({
        image: imageUrl,
        caption: req.body.caption,
        loginID: req.user.loginID,
      });
      console.log("Wall Post created")


      res.sendStatus(200);



    } catch (err) {
      console.log(err);
      res.render("error/500");
    }
},

deleteWallPost: async (req, res) => {
  try {
    await Wall.findOneAndDelete({
      _id: req.body.deleteWallPostID,
    });

    await WallComments.deleteMany({
      wall: req.body.deleteWallPostID,
    });

    console.log("Deleted Wall Post and all its Comments");
    res.json("Deleted Wall Post and all its Comments");
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
},

editWallPostButton: async (req, res) => {
  try {
    let wallPost = await Wall.findById({
      _id: req.params.id,
    }).lean();

    if (!wallPost) {
      return res.render("error/404");
    }

    if (wallPost.loginID !== req.user.loginID) {
      res.redirect("/post/dashboard");
    } else {
    }
    res.render("editWallPost", {
      wallPost,
    });
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
},


// editWallPost:  async (req, res) => {
//   try {

//     let wallPost = await Wall.findById({
//       _id: req.params.id,
//     }).lean();

//   let imageUrl
//   if(req.file === undefined){
//     imageUrl = wallPost.image
//   }else{
//     imageUrl = await imageCompressionUpload(req.file.key, 600, 800)
//   }

//   await Wall.findOneAndUpdate(
//       {
//       _id: req.params.id,
//       },
//       {
//       image: imageUrl
//       },
//       {
//       new: true,
//       runValidators: true,
//       }
//       )

//       res.redirect("/post/dashboard");
//     }
//    catch (err) {
//     console.error(err);
//     return res.render("error/500");
//   }
// },

feed: async(req,res)=>{
  try {
      let allWallPosts = await Wall.find({}).lean()
      let users = await User.find({}).lean()



      res.render('feed', {
        allWallPosts: allWallPosts,
        users: users
       })
  } catch (err) {
      console.log(err)
      res.render('error/500')
  }
},

getWallPost: async(req,res)=>{
  try {
    let wallPost = await Wall.findById({
      _id: req.params.id,
    }).lean();
    let users = await User.find({}).lean()


    let wallPostComments = await WallComments.find().lean()

      res.render('wallPost', {
        wallPost: wallPost,
        wallPostComments: wallPostComments,
        users: users

       })
  } catch (err) {
      console.log(err)
      res.render('error/500')
  }
},

createComment: async (req, res) => {
    try {
     let wallPostComment =  await WallComments.create({
            captionComment: req.body.captionComment,
            heart: req.body.heart,
            heartBreak: req.body.heartBreak,
            wall: req.params.id,
            loginID: req.user.loginID
          })
    await wallPostComment.save()
    let wallPost = await Wall.findById({
        _id: req.params.id,
      }).lean()

    wallPost.wallComments.push(wallPostComment)

      console.log(`Comment added to wallPost ${req.params.id}`)
      res.redirect(`/wall/${req.params.id}`)
    } catch (err) {
      console.log(err)
      res.render('error/500')
    }
  },
  wallPostHeartIncreaseDecreaseID: async (req, res) => {
    try {
      let wallPost = await Wall.find({
        _id: req.body.wallPostHeartIncreaseDecreaseID,
      });

      let check;
      wallPost.forEach((post) => {
        check = post.heart.includes(req.user.loginID);
      });

      if (!check) {
        await Wall.findOneAndUpdate(
          {
            _id: req.body.wallPostHeartIncreaseDecreaseID,
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
          `Wall Post ${req.body.wallPostHeartIncreaseDecreaseID} heart's increased`
        );
      } else {
        await Wall.findOneAndUpdate(
          {
            _id: req.body.wallPostHeartIncreaseDecreaseID,
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
          `Wall Post ${req.body.wallPostHeartIncreaseDecreaseID} heart's decreased`
        );
      }

      res.json(`Wall Post ${req.body.wallPostHeartIncreaseDecreaseID} heart's updated`);
    } catch (err) {
      console.log(err);
      res.render("error/500");
    }
  },

  wallPostHeartBreakIncreaseDecreaseID: async (req, res) => {
    try {
      let wallPost = await Wall.find({
        _id: req.body.wallPostHeartBreakIncreaseDecreaseID,
      });
      let check;
      wallPost.forEach((post) => {
        check = post.heartBreak.includes(req.user.loginID);
      });

      if (!check) {
        await Wall.findOneAndUpdate(
          {
            _id: req.body.wallPostHeartBreakIncreaseDecreaseID,
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
          `Wall Post ${req.body.wallPostHeartBreakIncreaseDecreaseID} heartbreak's increased`
        );
      } else {
        await Wall.findOneAndUpdate(
          {
            _id: req.body.wallPostHeartBreakIncreaseDecreaseID,
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
          `Wall Post ${req.body.wallPostHeartBreakIncreaseDecreaseID} heartbreak's decreased`
        );
      }

      res.json(
        `Wall Post ${req.body.wallPostHeartBreakIncreaseDecreaseID} heartbreak's updated`
      );
    } catch (err) {
      console.log(err);
      res.render("error/500");
    }
  },


  wallPostCommentHeartIncreaseDecreaseID: async (req, res) => {
    try {
      let comment = await WallComments.find({
        _id: req.body.wallPostCommentHeartIncreaseDecreaseID,
      });
      let check;
      comment.forEach((com) => {
        check = com.heart.includes(req.user.loginID);
      });

      if (!check) {
        await WallComments.findOneAndUpdate(
          {
            _id: req.body.wallPostCommentHeartIncreaseDecreaseID,
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
          `Wall Post Comment ${req.body.wallPostCommentHeartIncreaseDecreaseID} heart's increased`
        );
      } else {
        await WallComments.findOneAndUpdate(
          {
            _id: req.body.wallPostCommentHeartIncreaseDecreaseID,
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
          `Wall Post Comment ${req.body.wallPostCommentHeartIncreaseDecreaseID} heart's decreased`
        );
      }

      res.json(`Wall Post Comment ${req.body.wallPostCommentHeartIncreaseDecreaseID} heart's updated`);
    } catch (err) {
      console.log(err);
      res.render("error/500");
    }
  },

  wallPostCommentHeartBreakIncreaseDecreaseID: async (req, res) => {
    try {
      let comment = await WallComments.find({
        _id: req.body.wallPostCommentHeartBreakIncreaseDecreaseID,
      });
      let check;
      comment.forEach((com) => {
        check = com.heartBreak.includes(req.user.loginID);
      });

      if (!check) {
        await WallComments.findOneAndUpdate(
          {
            _id: req.body.wallPostCommentHeartBreakIncreaseDecreaseID,
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
          `Wall Post Comment ${req.body.wallPostCommentHeartBreakIncreaseDecreaseID} heartbreak's increased`
        );
      } else {
        await WallComments.findOneAndUpdate(
          {
            _id: req.body.wallPostCommentHeartBreakIncreaseDecreaseID,
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
          `Wall Post Comment ${req.body.wallPostCommentHeartBreakIncreaseDecreaseID} heartbreak's decreased`
        );
      }

      res.json(
        `Wall Post Comment ${req.body.wallPostCommentHeartBreakIncreaseDecreaseID} heartbreak's updated`
      );
    } catch (err) {
      console.log(err);
      res.render("error/500");
    }
  },

  deleteWallPostComment: async (req, res) => {
    try {
      await WallComments.findOneAndDelete({
        _id: req.body.deleteWallPostCommentID
      })
      console.log('Deleted Wall Post Comment')
      res.json('Deleted Wall Post Comment')

    } catch (err) {
      console.log(err)
      res.render('error/500')
    }
  },

  wallPostCommentButton: async (req, res) => {
    try {

      let wallPostComment = await WallComments.findById({
        _id: req.params.id,
      }).lean()

      if (!wallPostComment) {
        return res.render('error/404')
      }

      if (wallPostComment.loginID !== req.user.loginID) {
        res.redirect('/post/dashboard')
      } else {}
      res.render('editWallPostComment', {
        wallPostComment
      })

    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  },

  wallPostEditComment: async (req, res) => {
    try {
      let comment = await WallComments.findOne({
        _id: req.params.id,
      }).lean()
      if (!comment) {
        return res.render('error/404')
      }

      if (comment.loginID !== req.user.loginID) {
        res.redirect('/post/dashboard')
      } else {
        comment = await WallComments.findOneAndUpdate({
          _id: req.params.id
        }, req.body, {
          new: true,
          runValidators: true,
        })
        res.redirect("/post/dashboard")
       }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  },



}
