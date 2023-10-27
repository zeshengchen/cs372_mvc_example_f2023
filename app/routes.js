// create a new express routes
const express = require('express'),
    router = express.Router(),
    mainController = require('./controllers/main.controller'),
    postsController = require('./controllers/posts.controller')

// export reroutes
module.exports = router 

// define routes
// main routes
router.get('/', mainController.showHome)

// seed events
router.get('/posts/seed', postsController.seedPosts)

// post routes
router.get('/posts', postsController.showPosts)

// create posts
router.get('/posts/create', postsController.showCreate)
router.post('/posts/create', postsController.processCreate)

router.get('/posts/:slug', postsController.showSingle)
