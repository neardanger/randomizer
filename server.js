var express = require('express'),
    app = express(),
    logger = require('morgan'),
    ejs = require('ejs'),
    ejsLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    passportConfig = require('./config/passport')
    userRoutes = require('./routes/users.js'),
    giftRoutes = require('./routes/gifts.js'),
    apiRoutes = require('./routes/api.js'),
    path = require('path'),
    request = require('request'),
    bodyParser = require('body-parser')


    var ampl = require('ampl'),
    markdownString = "readme.md"
    cssStyle = "./public/css/styles.css"
    ampl.parse(markdownString, cssStyle, function(ampHtml){
        console.log(ampHtml)
    });




app.use('/public', express.static(path.join(__dirname,'public')))


app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())



app.use(session({
    secret:'dank memes',
    cookie:{_expires: 6000000}
}))



app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.set('view engine','ejs')


app.use(ejsLayouts)



var port = process.env.PORT || 8000
var dbUrl = process.env.MLAB_URI || 'mongodb://localhost/giphtur'

mongoose.connect(dbUrl,function(err){
    if(err) return console.log('Cannot connect to the server:(')
    console.log("You are connected to the database!")
})

app.get('/gifts',isLoggedIn,function(req,res){
    console.log(req.query)
    res.render('gifts',{user:req.user})
})

function isLoggedIn(req,res,next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/login')
}




app.listen(port,function(req,res,next){
    console.log('Now listening to ' + port + ' enjoy your stay')
})


//Advanced routes

app.use('/', userRoutes)
app.use('/', giftRoutes)
app.get('/api', apiRoutes)

