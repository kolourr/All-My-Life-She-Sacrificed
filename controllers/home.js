const User = require('../models/user')
const Post = require('../models/post')
const Comments = require('../models/comment')

module.exports = {
    getHome: async(req,res)=>{
        try {
            const user = await User.find({}).lean()
            const post = await Post.find({}).lean()
            const comment = await Comments.find({}).lean()
            res.render('dashboard.ejs', {
                user: user,
                posts: post,
                comments: comment
            })
        } catch (err) {
            console.log(err)
        }        
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
        res.render('error/404.ejs')
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