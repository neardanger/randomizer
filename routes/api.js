var passport = require('passport'),
    express = require('express'),
    apiRouter = express.Router(),
    apiCtrl = require('../controllers/api.js')


apiRouter.get('/api', apiCtrl.show)

module.exports = apiRouter