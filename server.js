const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/database')
const authRoutes = require('./routes/auth')
const homeRoutes = require('./routes/home')
const postRoutes = require('./routes/post')
require('dotend').config({path: './config/.env'})
require('./config/passport')(passport)
connectDB()

//EJS and Body Parser
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())



  
app.use('/', homeRoutes)
app.use('/auth', authRoutes)
app.use('/todos', todoRoutes)
 
app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on PORT ${process.env.PORT}`)
})    