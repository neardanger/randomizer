var mongoose = require('mongoose'),
    Gift = require('../models/Gift.js')
    bcrypt = require('bcrypt-nodejs')

    var userSchema = new mongoose.Schema({
        local:{
            name:String,
            email:String,
            password:String,
            birthday: String
        },

        facebook:{
            id:String,
            name:String,
            token:String,
            email:String
        },

        gifts:[{type: mongoose.Schema.Types.ObjectId, ref:'Gift'}]
    })


    userSchema.methods.generateHash = function(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
    }

    userSchema.methods.validPassword = function(password){
        return bcrypt.compareSync(password,this.local.password)
    }

    var User = mongoose.model('User',userSchema)

    module.exports = User