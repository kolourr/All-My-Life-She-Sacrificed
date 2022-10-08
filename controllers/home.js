require("dotenv").config({ path: "./config/.env" });
const User = require("../models/user");
const Wall = require("../models/wall");
const WallComments = require("../models/wallComments");
const Post = require("../models/post");
const Mom = require("../models/mom");
const Comments = require("../models/comment");
const upload = require("../middleware/upload");
const uploadbase64 = require("../middleware/uploadbase64");
const ContactUs = require("../models/contactus");
const mailOptions = require("../middleware/nodemailer");
const imageCompressionUpload = require("../middleware/imageCompressionUpload");
const sendMomtoSendy = require("../middleware/sendyMom");
const webpush = require("web-push");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
let fs = require("fs");

const storeItems = new Map([
  [1, { priceInCents: 2000, name: "Wish My Mom Every Year for Mother's Day" }],
]);

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
      let users = await User.find({}).lean()


      res.render("loggedinindex.ejs", {
        allPosts: allPosts,
        allComments: allComments,
        users: users
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

  createcheckoutsession: async (req, res) => {
    try {
      //Checking to see if the mom and child already exist in the database
      //If not, then adding the mom and the child to the database

      let mom = await Mom.findOne(
        {
          momEmail: req.body.momEmail,
          childFirstName: req.user.firstName,
        },
      );

      let momCreation;

      if (mom === null) {
        momCreation = await Mom.create({
          momName: req.body.momName,
          momEmail: req.body.momEmail,
          childName: req.body.childName,
          childEmail: req.user.email,
          childFirstName: req.user.firstName,
        });
      } else {
        momCreation = Mom.findOne(
          {
            momEmail: req.body.momEmail,
            childFirstName: req.user.firstName,
          },
        );
      }

      //User's Information is then sent to stripe to complete payment

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: req.user.email,
        mode: "payment",
        billing_address_collection: "auto",
        line_items: req.body.items.map((item) => {
          const storeItem = storeItems.get(item.id);
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: storeItem.name,
              },
              unit_amount: storeItem.priceInCents,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${process.env.SERVER_URL}/mothersdaysuccess?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url: `${process.env.SERVER_URL}/mothersdayfailure`,
      });
      res.json({ url: session.url });
    } catch (err) {
      console.error(err);
      return res.render("error/500");
    }
  },

  mothersday: (req, res) => {
    res.render("mothersday", {user: req.user});
  },

  mothersdaysuccess: async (req, res) => {

    //Getting Payment information and receipt from Stripe
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );
    const customer = await stripe.customers.retrieve(session.customer);

    //Getting the mom's information from the database
    let mom = await Mom.findOne(
      {
        childEmail: req.user.email,
        childFirstName: req.user.firstName,
      }
    )

    //Subscribing the mom to the Sendy Email List and sending payment confirmation to the child
    sendMomtoSendy(mom.momName,mom.momEmail,mom.childEmail,mom.childName, mom.childFirstName)

    res.render("mothersdaysuccess", {
      mom,
      customer,
    });
  },

  mothersdayfailure: (req, res) => {
    res.render("mothersdayfailure", {user: req.user});
  },

  message: (req, res) => {
    res.render("message", {user: req.user});
  },

  messageSentSuccessfully: (req, res) => {
    res.render("messageSentSuccessfully", {
      confirmation: `Thank You for contacting us. We will try to get back to you as soon as possible.`,
    });
  },

  login: (req, res) => {
    res.render("login", {user: req.user});
  },

  updatedindex: (req, res) => {
    res.render("updatedindex.ejs", {user: req.user});
  },
  nft: (req, res) => {
    res.render("nft", {user: req.user});
  },
  song: (req, res) => {
    res.render("song", {user: req.user});
  },

  about: (req, res) => {
    res.render("about.ejs", {user: req.user});
  },

  termsofuse: (req, res) => {
    res.render("termsofuse.ejs", {
      user: req.user
    });
  },
  privacypolicy: (req, res) => {
    res.render("privacypolicy.ejs", {user: req.user});
  },
  error404: (req, res) => {
    res.render("error/404.ejs", {user: req.user});
  },
  error500: (req, res) => {
    res.render("error/500.ejs", {user: req.user});
  },
};
