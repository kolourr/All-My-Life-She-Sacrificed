const express = require('express')
const app = express()
const passport = require('passport')
const session = require('express-session')
const mongoose = require("mongoose")
const MongoStore = require("connect-mongo")
const connectDB = require('./config/database')
const methodOverride = require('method-override')
const aws = require('@aws-sdk/client-s3')
const multer = require('multer')
const multerS3 = require('multer-s3')
const authRoutes = require('./routes/auth')
const homeRoutes = require('./routes/home')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')


//Dotenv -- Passport -- Connect Database 
require('dotenv').config({path: './config/.env'})
require('./config/passport')(passport)
connectDB()

//EJS and Body Parser
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.json({limit: '50mb'}))

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)
 

// Sessions Middleware
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        dbName: 'allMyLifeSheSacrificed'
    })
    })
  )

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Routes   
app.use('/', homeRoutes)
app.use('/auth', authRoutes)
app.use('/post', postRoutes)
app.use('/comment', commentRoutes)

 
app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`)
})    