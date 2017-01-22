var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    User = require('../models/User.js')
    Schema = mongoose.Schema




var giftSchema = new mongoose.Schema({

    gift1: String,
    gift2: String,
    gift3: String,
    
  _by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})
    
   





var Gift = mongoose.model('Gift', giftSchema)


module.exports = Gift