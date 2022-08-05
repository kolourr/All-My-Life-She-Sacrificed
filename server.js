const express = require('express')
const app = express()
const passport = require('passport')
const session = require('express-session')
const mongoose = require("mongoose")
const MongoStore = require("connect-mongo")
const connectDB = require('./config/database')
const authRoutes = require('./routes/auth')
const homeRoutes = require('./routes/home')
const postRoutes = require('./routes/post')

//Dotenv -- Passport -- Connect Database 
require('dotenv').config({path: './config/.env'})
require('./config/passport')(passport)
connectDB()

//EJS and Body Parser
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


  

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
 
app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`)
})    