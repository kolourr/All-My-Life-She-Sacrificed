const User = require("../models/user");
const Wall = require("../models/wall");
const WallComments = require("../models/wallComments");
const Post = require("../models/post");
const Comments = require("../models/comment");
const upload = require("../middleware/upload");
const uploadbase64 = require("../middleware/uploadbase64");
const ContactUs = require("../models/contactus");
const mailOptions = require("../middleware/nodemailer");
const imageCompressionUpload = require("../middleware/imageCompressionUpload");
const webpush = require("web-push")
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
var fs = require("fs")

const storeItems = new Map([
  [1, { priceInCents: 1999, name: "Always Wish My Mom for Mother's Day" }],
])


module.exports = {
  getHome: async (req, res) => {
    try {
      let allPosts = await Post.find({})
        .lean()
        .sort({ createdAt: "desc" })
        .lean();
      res.render("index.ejs", {
        allPosts: allPosts,
      });
    } catch (err) {
      console.log(err);
      res.render("error/500");
    }
  },

  getProfile: async (req, res) => {
    try {
      let user = await User.find({
        loginID: req.user.loginID,
      });

      res.render("profile", {
        user,
      });
    } catch (err) {
      console.log(err);
      res.render("error/500");
    }
  },

  editProfileButton: async (req, res) => {
    try {
      let user = await User.find({
        loginID: req.user.loginID,
      });

      if (!user) {
        return res.render("error/404");
      }
      res.render("editProfile", {
        user,
      });
    } catch (err) {
      console.error(err);
      return res.render("error/500");
    }
  },

  editProfile: async (req, res) => {
    try {
      let user = await User.find({
        _id: req.user.id,
      });

      if (!user) {
        return res.render("error/404");
      }

      user = await User.findOneAndUpdate(
        {
          _id: req.user.id,
        },
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          displayName: req.body.displayName,
          email: req.body.email,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.redirect("/profile");
    } catch (err) {
      console.error(err);
      return res.render("error/500");
    }
  },

  editProfilePicture: async (req, res) => {
    try {
      let name =
        Date.now().toString() + Math.floor(Math.random() * 1250) + ".jpg";
      let uploadedImageUrl = uploadbase64(req.body.base64, name);

      await User.findOneAndUpdate(
        {
          _id: req.user.id,
        },
        {
          image: uploadedImageUrl,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      res.redirect("/editprofile");
    } catch (err) {
      console.error(err);
      return res.render("error/500");
    }
  },

  getHomeLoggedIn: async (req, res) => {
    try {
      let allPosts = await Post.find({}).lean();
      let allComments = await Comments.find({});

      res.render("loggedinindex.ejs", {
        allPosts: allPosts,
        allComments: allComments,
      });
    } catch (err) {
      console.log(err);
      res.render("error/500");
    }
  },

  sendmessage: async (req, res) => {
    try {
      let userName = req.body.name;
      let userEmail = req.body.email;
      let userMessageReceived = req.body.message;

      let userMessage = `
                <h3>Contact Details</h3>
                <ul>  
                <li>Name: ${userName}</li>
                <li>Email: ${userEmail}</li>
                </ul>
                <h3>Message</h3>
                <p>${userMessageReceived}</p>
            `;

      await ContactUs.create({
        name: userName,
        email: userEmail,
        message: userMessageReceived,
      });

      mailOptions(userName, userMessage);

      res.redirect("messageSentSuccessfully");
    } catch (err) {
      console.log(err);
      res.render("error/500");
    }
  },

  subscribe: async (req, res) => {
    //Checking to see how many user posts have been made since yesterday
    let userWallPosts = await Wall.find(
      {
        createdAt: {
          $lt: new Date(),
          $gte: new Date(new Date() - 1 * 60 * 60 * 24 * 1000),
        },
      },
      {
        loginID: req.user.loginID,
      }
    );

    let allWallPosts = await Wall.find({
      createdAt: {
        $lt: new Date(),
        $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
      },
    });

    let userTextPosts = await Post.find(
      {
        createdAt: {
          $lt: new Date(),
          $gte: new Date(new Date() - 1 * 60 * 60 * 24 * 1000),
        },
      },
      {
        loginID: req.user.loginID,
      }
    );

    let allTextPosts = await Post.find({
      createdAt: {
        $lt: new Date(),
        $gte: new Date(new Date() - 1 * 60 * 60 * 24 * 1000),
      },
    });

    const vapidKeys = {
      publicKey: process.env.VAPID_PUBLIC_KEY,
      privateKey: process.env.VAPID_PRIVATE_KEY,
    };

    webpush.setVapidDetails(
      `mailto:!${process.env.APP_EMAIL}`,
      vapidKeys.publicKey,
      vapidKeys.privateKey
    );

    // Get pushSubscription object
    const subscription = req.body;

    // Resource created successfully
    res.status(201).json({});

    // Create payload
    const payload = JSON.stringify({
      title: "All My Life She Sacrificed",
      userWallPosts: userWallPosts.length,
      allWallPosts: allWallPosts.length,
      userTextPosts: userTextPosts.length,
      allTextPosts: allTextPosts.length,
    });

    // Pass object into sendNotification
    webpush
      .sendNotification(subscription, payload)
      .catch((err) => console.log(err));
  },


  mothersday: (req, res) => {
    res.render("mothersday");
  },

  createcheckoutsession: (req, res) => {
   },

  message: (req, res) => {
    res.render("message");
  },

  messageSentSuccessfully: (req, res) => {
    res.render("messageSentSuccessfully", {
      confirmation: `Thank You for contacting us. We will try to get back to you as soon as possible.`,
    });
  },

  updatedindex: (req, res) => {
    res.render("updatedindex.ejs");
  },

  about: (req, res) => {
    res.render("about.ejs");
  },
  cover: (req, res) => {
    res.render("cover.ejs");
  },
  termsofuse: (req, res) => {
    res.render("termsofuse.ejs");
  },
  privacypolicy: (req, res) => {
    res.render("privacypolicy.ejs");
  },
  error404: (req, res) => {
    res.render("error/404.ejs");
  },
  error500: (req, res) => {
    res.render("error/500.ejs");
  },
};
