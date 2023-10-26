// create a new express routes
const express = require('express'),
    router = express.Router(),
    mainController = require('./controllers/main.controller'),
    postController = require('./controllers/posts.controller')

// export reroutes
module.exports = router 

// define routes
// main routes
router.get('/', mainController.showHome)

// post routes
router.get('/posts', postController.showPosts)