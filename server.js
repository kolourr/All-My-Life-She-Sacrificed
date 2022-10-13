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
const wallRoutes = require('./routes/wall')
const commentRoutes = require('./routes/comment')
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const cors = require('cors')






//Dotenv -- Passport -- Connect Database
require('dotenv').config({path: './config/.env'})
require('./config/passport')(passport)
connectDB()

//EJS and Body Parser
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true, limit: '200mb' }))
app.use(express.json({limit: '50mb'}))
app.use(cors({
  origin: ['http://localhost:3000','http://allmylifeshesacrificed.com/','https://allmylifeshesacrificed.com/','https://all-my-life-she-sacrificed.onrender.com/','https://www.allmylifeshesacrificed.com/'],
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  credentials: true
}))

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
app.use('/wall', wallRoutes)



app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`)
})