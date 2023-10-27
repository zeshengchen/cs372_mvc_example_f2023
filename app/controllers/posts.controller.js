const Post = require('../models/post')
const { check, validationResult } = require('express-validator')

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
            res.render('pages/single', {
                post: post,
                success: req.flash('success')
            })
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
    res.render('pages/create', {
        errors: req.flash('errors')
    })
}

/**
 * Process the creation form
 */
async function processCreate(req, res) {
    // validate information
    await check('name', 'Name is required').notEmpty().run(req)
    await check('description', 'Description is required').notEmpty().run(req)

    // if there are errors, redirect and save errors to flash
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.flash('errors', errors.errors.map(err => err.msg))
        return res.redirect('/posts/create')
    }

    // create a new post
    const post = new Post({
        name: req.body.name,
        description: req.body.description
    })

    // save post 
    try {
        await post.save()

        // set a successful flash message
        req.flash('success', 'Successfuly created post!')
        res.redirect(`/posts/${post.slug}`)
    } catch {
        res.status(500)
        res.send('Post not saved!')
    }
}