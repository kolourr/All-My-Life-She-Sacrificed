const User = require('../models/user')
const Post = require('../models/post')
const Comments = require('../models/comment')


module.exports = {
    dashboard: async(req,res)=>{
        try {
            const allUserPosts = await Post.find({loginID: req.user.loginID})
            const allUserComments = await Comments.find({loginID: req.user.loginID}) 
            
            res.render('dashboard.ejs', {
                allUserPosts: allUserPosts,
                allUserComments: allUserComments
            })
        } catch (err) {
            console.log(err)
            res.render('error/500')
        }        
    },

    createPost: async(req,res)=>{
        try {
            await Post.create({
                title: req.body.title, 
                body: req.body.body, 
                postType: req.body.postType, 
                heart: req.body.heart, 
                heartBreak: req.body.heartBreak, 
                loginID: req.user.loginID
        })

            console.log('Post created')
            res.redirect('/updatedindex')
        } catch (err) {
            console.log(err)
            res.render('error/500')
        }        
    },




 

 
}