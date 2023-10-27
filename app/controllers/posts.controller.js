const Post = require('../models/post')

module.exports = {
    showPosts: showPosts,
    showSingle: showSingle,
    seedPosts: seedPosts
}

/** 
 * show all posts
 */
function showPosts(req, res) {
    // get all posts

    // return a view with data
    res.render('pages/posts', { posts: posts })
}

/**
 * show a single post
 */
function showSingle(req, res) {
    // get a single post
    const post = { name: 'Homework', slug: 'homework', description: 'Homework is challenging!' }

    res.render('pages/single', { post: post })
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
