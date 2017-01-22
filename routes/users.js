var express = require('express'),
    passport = require('passport'),
    userRouter = express.Router(),
    userCtrl = require('../controllers/users.js')



    
    //Need to protect these routes

    userRouter.route('/')
        .get(function(req,res){
            res.render('index',{user: req.user})
        })
      
     userRouter.route('/login')
        .get(function(req,res){
            res.render('login',{message:req.flash('loginMessage'), user:req.user})
        })
        .post(passport.authenticate('local-login',{
            successRedirect: '/profile',
            failureRedirect: '/login'
        }))

        userRouter.route('/signup')
        .get(function(req,res){
            res.render('signup',{message: req.flash('signupMessage'),user:req.user}) 
        })
        .post(passport.authenticate('local-signup',{
            successRedirect : '/profile',
            failureRedirect : '/signup'

        }))

        userRouter.route('/gifts',isLoggedIn,function(req,res){
            res.render('gifts', {user: req.user})
        })
              

         userRouter.get('/profile',isLoggedIn,function(req,res){
        res.render('profile',{user:req.user})
    })

    userRouter.patch('/profile/:id',function(req,res){
        console.log(req.body)
        User.findOneAndUpdate({_id:req.params.id},req.body,{new:true},function(err,user){
        if(err) console.log (err)
        res.json({success:"You're through",user: user})
        console.log(user)
        })
    })

    userRouter.delete('/profile/:id',function(req,res){
        User.findOneAndRemove({_id:req.params.id}, function(err){
            if(err){
            console.log(err)
            res.json({success:false,message:"Failed to delete"})
            }else{
                res.json({sucess:"",message:"Deleted"})
            }
        })
    })

    userRouter.get('/update',isLoggedIn,function(req,res){
        res.render('update',{user:req.user})
    })




//Facebook Routes
 

    
   userRouter.get('/auth/facebook',
  passport.authenticate('facebook',{scope:'email'}));



userRouter.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
      successRedirect:'/profile',
      failureRedirect:('/signup')
  }))
  



  



    

    


  


    /////////////////////


    function isLoggedIn(req,res,next){
        if(req.isAuthenticated()) return next()
        res.redirect('/login')
    }


 //Adding profile update cause this goober didn't have it'

    userRouter.get('/logout',function(req,res){
        req.logout()
        res.redirect('/')
    })


   

    

   

    




   





        module.exports = userRouter