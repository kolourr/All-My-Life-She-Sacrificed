const User = require('../models/user')
const Post = require('../models/post')
const Comments = require('../models/comment')


module.exports = {
    allPosts: async(req,res)=>{
        try {
            const allPosts = await Post.find({}).populate('user').lean()

            console.log(allPosts)

            res.render('dashboard.ejs', {
                allPosts: allPosts
            })
        } catch (err) {
            console.log(err)
            res.render('error/500')
        }        
    },

    userData: async(req,res)=>{
        try {
            const userPosts = await Post.find({}).lean()
            res.render('index.ejs', {
                userPosts: userPosts
            })
        } catch (err) {
            console.log(err)
            res.render('error/500')
        }        
    },


    createPost: async(req,res)=>{
        try {
            console.log(req.body)
            await Post.create(req.body)
            console.log('Post created')
            res.redirect('/updatedindex')
        } catch (err) {
            console.log(err)
            res.render('error/500')
        }        
    },




 

 
}