const User = require('../models/user')
const Post = require('../models/post')
const Comments = require('../models/comment')
 

module.exports = {
    getHome: async(req,res)=>{
        try {
            let allPosts = await Post.find({}).lean()
            res.render('index.ejs', {
                allPosts: allPosts, 
            })
        } catch (err) {
            console.log(err)
            res.render('error/500')
        }        
    },

    getProfile: async(req,res)=>{
        try {
            let user = await User.find({
                loginID: req.user.loginID}) 

            res.render('profile', {
                user
            })

        } catch (err) {
            console.log(err)
            res.render('error/500')
        }        
    },
    

    editProfileButton: async (req, res) => {
        try {
          let user = await User.find({
            loginID: req.user.loginID,
          })

          if (!user) {
            return res.render("error/404");
          }
          res.render("editProfile", {
            user,
          })
        } catch (err) {
          console.error(err);
          return res.render("error/500");
        }
      },

      editProfile: async (req, res) => {
        try {
            let user = await User.find({
                _id: req.user.id,
              })
    
          if (!user) {
            return res.render("error/404");
          }
    
            user = await User.findOneAndUpdate(
              {
                _id: req.user.id,
              },
              req.body,
              {
                new: true,
                runValidators: true,
              }
            );
            res.redirect("/post/dashboard");
          }
         catch (err) {
          console.error(err);
          return res.render("error/500");
        }
      },




 

    getHomeLoggedIn: async(req,res)=>{
        try {
            let allPosts = await Post.find({}).lean()
            let allComments = await Comments.find({})

            res.render('loggedinindex.ejs', {
                allPosts: allPosts, 
                allComments: allComments
            })
        } catch (err) {
            console.log(err)
            res.render('error/500')
        }        
    },
    
    updatedindex: (req,res)=>{
        res.render('updatedindex.ejs')
    },

    about: (req,res)=>{
        res.render('about.ejs')
    },
    cover: (req,res)=>{
        res.render('cover.ejs')
    },    
    termsofuse: (req,res)=>{
        res.render('termsofuse.ejs')
    }
    ,    
    privacypolicy: (req,res)=>{
        res.render('privacypolicy.ejs')
    }
    ,    
    error404: (req,res)=>{
        res.render('error/404.ejs')
    }
    ,    
    error500: (req,res)=>{
        res.render('error/500.ejs')
    },
}