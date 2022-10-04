const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/user");
const fetch = require("node-fetch");
const sendUsertoSendy = require("../middleware/sendySub");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://www.allmylifeshesacrificed.com/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          loginID: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
        };

        try {
          let user = await User.findOne({ loginID: profile.id });

          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);

            //Subcribing the user to a Mailing List using the Sendy API (self-hosted)
            //A Welcome email is sent to the user  followed by an email from the auto-responded (emails sent through AWS SES)

            sendUsertoSendy(profile.name.givenName, profile.emails[0].value);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
