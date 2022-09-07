const User = require("../models/user");
const Wall = require("../models/wall");
const WallComments = require("../models/wallComments");
const upload = require("../middleware/upload"); 
const imageCompressionUpload = require("../middleware/imageCompressionUpload"); 


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
    
      let imageUrl = await imageCompressionUpload(req.file.key, 600, 800)   
      await Wall.create({
        image: imageUrl,
        caption: req.body.caption,
        loginID: req.user.loginID,
      });
      console.log("Wall Post created");
      // res.redirect("/updatedindex");

 
    } catch (err) {
      console.log(err);
      res.render("error/500");
    }
},

 

}
