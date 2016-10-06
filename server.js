var express = require('express'),
    app = express(),
    logger = require('morgan'),
    cors = require('cors'),
    path = require('path'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    ejsLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    passportConfig = require('./config/passport')
    request = require('request'),
    userRoutes = require('./routes/users.js')
    giftRoutes = require('./routes/gifts.js')



app.use('/public',express.static(path.join(__dirname,'public')))


app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    secret:'dank memes',
    cookie:{_expires: 6000000}
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())


app.set('view engine','ejs')
app.use(ejsLayouts)


var port = process.env.PORT || 8000
var dbUrl = process.env.MLAB_URI || 'mongodb://localhost/giphtur'

mongoose.connect(dbUrl,function(err){
    if(err) return console.log('Cannot connect to the server:(')
    console.log("You are connected to the database!")
})
app.get('/',function(req,res,next){
    res.render('index.ejs')
})




app.listen(port,function(req,res,next){
    console.log('Now listening to ' + port + ' enjoy your stay')
})


//Advanced routes

app.use('/',userRoutes)
app.use('/',giftRoutes)

