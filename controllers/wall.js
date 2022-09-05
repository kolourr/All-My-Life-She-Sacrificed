const User = require("../models/user");
const Wall = require("../models/wall");
const WallComments = require("../models/wallComments");
const upload = require("../middleware/upload"); 

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

      console.log(req.file)
      // await Post.create({
      //   title: req.body.title,
      //   body: req.body.body,
      //   postType: req.body.postType,
      //   loginID: req.user.loginID,
      // });
      // console.log("Post created");
      // res.redirect("/updatedindex");
    } catch (err) {
      console.log(err);
      res.render("error/500");
    }
},


 
 


}
