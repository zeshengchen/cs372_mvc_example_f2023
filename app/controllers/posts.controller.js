const Post = require('../models/post')

module.exports = {
    showPosts: showPosts,
    showSingle: showSingle,
    seedPosts: seedPosts,
    showCreate: showCreate,
    processCreate: processCreate
}

/** 
 * show all posts
 */
async function showPosts(req, res) {
    // get all posts
    try {
        posts = await Post.find({})

        // return a view with data
        res.render('pages/posts', { posts: posts })

    } catch {
        res.status(404)
        res.send('Posts not found')
    }
}

/**
 * show a single post
 */
async function showSingle(req, res) {
    // get a single post
    try {
        post = await Post.findOne({ slug: req.params.slug })

        if (post !== undefined && post !== null)
            res.render('pages/single', { post: post })
        else {
            res.status(404)
            res.send('Post not found!')
        }
    } catch {
        res.status(404)
        res.send('Post not found!')
    }
}

/**
 * seed our database
 */
async function seedPosts(req, res) {
    // create some posts 
    const posts = [
        { name: 'Homework', description: 'Homework is challenging!' },
        { name: 'Lecture', description: 'Lecture is fun!' },
        { name: 'Project', description: 'Course Project is great!' }
    ]

    // use the Post model to insert/save
    await Post.deleteMany({})

    for (post of posts) {
        let newPost = new Post(post)
        await newPost.save()
    }

    // seeded!
    res.send('Database seeded!')
}

/**
 * Show the create form
 */
function showCreate(req, res) {
    res.render('pages/create')
}

/**
 * Process the creation form
 */
async function processCreate(req, res) {
    // create a new post
    const post = new Post({
        name: req.body.name,
        description: req.body.description
    })

    // save post 
    try {
        await post.save()
        res.redirect(`/posts/${post.slug}`)
    } catch {
        res.status(500)
        res.send('Post not saved!')
    }
}