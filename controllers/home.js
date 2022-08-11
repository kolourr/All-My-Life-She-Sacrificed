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
    }
}