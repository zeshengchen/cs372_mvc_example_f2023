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

// seed events
router.get('/posts/seed', postController.seedPosts)

// post routes
router.get('/posts', postController.showPosts)
router.get('/posts/:slug', postController.showSingle)
