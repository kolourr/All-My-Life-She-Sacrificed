const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/user')
const fetch = require('node-fetch')
 

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          loginID: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
        }

 
        try {
          let user = await User.findOne({ loginID: profile.id })

          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
    
          }


          const sub = {
            api_key: process.env.SENDY_API_KEY,
            list: process.env.LIST_ID,
            name: profile.name.givenName,
            email: profile.emails[0].value,
          }

  
          const sendySubResponse = await fetch(`${process.env.SENDY_URL}/subscribe`, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            content: sub
          });
          
          const subData = await sendySubResponse.json()
          console.log(subData)
        

        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
