// create a new express routes
const express = require('express'),
    router = express.Router(),
    mainController = require('./controllers/main.controller')

// export reroutes
module.exports = router 

// define routes
router.get('/', mainController.showHome)
