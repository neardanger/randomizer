var passport = require('passport'),
    express = require('express'),
    apiRouter = express.Router(),
    apiCtrl = require('../controllers/api.js')


apiRouter.get('/api', apiCtrl.show)

apiRouter.get('/api1',apiCtrl.show2)

module.exports = apiRouter