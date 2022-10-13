const User = require("../models/user");
const Post = require("../models/post");
const Comments = require("../models/comment")
const Wall = require("../models/wall");
const WallComments = require("../models/wallComments");
const upload = require("../middleware/upload");
const imageCompressionUpload = require("../middleware/imageCompressionUpload");

module.exports = {
  dashboard: async (req, res) => {
    try {
      let allUserPosts = await Post.find({
        loginID: req.user.loginID,
      }).sort({_id:-1}).lean()
      let postsWithUserComments = await Comments.find({
        loginID: req.user.loginID,
      }).populate("post").sort({_id:-1}).lean()

      let wallPosts = await Wall.find({
        loginID: req.user.loginID,
      }).sort({_id:-1}).lean()

      let users = await User.find({}).lean()



      let wallPostsWithUserComments = await WallComments.find({
        loginID: req.user.loginID,
      }).populate("wall");


      res.render("dashboard.ejs", {
        allUserPosts,
        postsWithUserComments,
        wallPosts,
        users,
        wallPostsWithUserComments,
      });
    } catch (err) {
      console.log(err);
      res.render("error/500");
    }
  },

  createPost: async (req, res) => {
    try {
      await Post.create({
        title: req.body.title,
        body: req.body.body,
        postType: req.body.postType,
        loginID: req.user.loginID,
      });
      console.log("Post created");
      res.redirect("/post/dashboard");
    } catch (err) {
      console.log(err);
      res.render("error/500");
    }
  },

  deletePost: async (req, res) => {
    try {
      await Post.findOneAndDelete({
        _id: req.body.deletePostID,
      });

      await Comments.deleteMany({
        post: req.body.deletePostID,
      });

      console.log("Deleted Post and all its Comments");
      res.json("Deleted Post and all its Comments");
    } catch (err) {
      console.log(err);
      res.render("error/500");
    }
  },

  editButton: async (req, res) => {
    try {
      let post = await Post.findById({
        _id: req.params.id,
      }).lean();

      if (!post) {
        return res.render("error/404");
      }

      if (post.loginID !== req.user.loginID) {
        res.redirect("/post/dashboard");
      } else {
      }
      res.render("editPost", {
        post,
      });
    } catch (err) {
      console.error(err);
      return res.render("error/500");
    }
  },

  editPost: async (req, res) => {
    try {
      let post = await Post.findOne({
        _id: req.params.id,
      }).lean();

      if (!post) {
        return res.render("error/404");
      }

      if (post.loginID !== req.user.loginID) {
        res.redirect("/post/dashboard");
      } else {
        post = await Post.findOneAndUpdate(
          {
            _id: req.params.id,
          },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        res.redirect("/post/dashboard");
      }
    } catch (err) {
      console.error(err);
      return res.render("error/500");
    }
  },

  getSinglePost:  async (req, res) => {

    try{

      let post = await Post.findById({
        _id: req.params.id,
      }).lean();
      let users = await User.find({}).lean()


      let postComments = await Comments.find().lean()

        res.render('singlePost', {
          post: post,
          postComments: postComments,
          users: users
         })

    }
    catch (err) {
      console.error(err);
      return res.render("error/500");
    }

  },

  postHeartIncreaseDecreaseID: async (req, res) => {
    try {
      let post = await Post.find({
        _id: req.body.postHeartIncreaseDecreaseID,
      });
      let check;
      post.forEach((post) => {
        check = post.heart.includes(req.user.loginID);
      });

      if (!check) {
        await Post.findOneAndUpdate(
          {
            _id: req.body.postHeartIncreaseDecreaseID,
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
          `Post ${req.body.postHeartIncreaseDecreaseID} heart's increased`
        );
      } else {
        await Post.findOneAndUpdate(
          {
            _id: req.body.postHeartIncreaseDecreaseID,
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
          `Post ${req.body.postHeartIncreaseDecreaseID} heart's decreased`
        );
      }

      res.json(`Post ${req.body.postHeartIncreaseDecreaseID} heart's updated`);
    } catch (err) {
      console.log(err);
      res.render("error/500");
    }
  },

  postHeartBreakIncreaseDecreaseID: async (req, res) => {
    try {
      let post = await Post.find({
        _id: req.body.postHeartBreakIncreaseDecreaseID,
      });
      let check;
      post.forEach((post) => {
        check = post.heartBreak.includes(req.user.loginID);
      });

      if (!check) {
        await Post.findOneAndUpdate(
          {
            _id: req.body.postHeartBreakIncreaseDecreaseID,
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
          `Post ${req.body.postHeartBreakIncreaseDecreaseID} heartbreak's increased`
        );
      } else {
        await Post.findOneAndUpdate(
          {
            _id: req.body.postHeartBreakIncreaseDecreaseID,
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
          `Post ${req.body.postHeartBreakIncreaseDecreaseID} heartbreak's decreased`
        );
      }

      res.json(
        `Post ${req.body.postHeartBreakIncreaseDecreaseID} heartbreak's updated`
      );
    } catch (err) {
      console.log(err);
      res.render("error/500");
    }
  },
};
