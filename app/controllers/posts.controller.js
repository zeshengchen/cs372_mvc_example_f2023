module.exports = {
    
    // show all posts
    showPosts: (req, res) => {
      // create dummy posts
      const posts = [
        { name: 'Homework', slug: 'homework', description: 'Homework is challenging!'},
        { name: 'Lecture', slug: 'lecture', description: 'Lecture is fun!'},
        { name: 'Project', slug: 'project', description: 'Course Project is great!'}
      ]

      // return a view with data
      res.render('pages/posts', { posts: posts });
    },

    // show a single post
    showSingle: (req, res) => {
        // get a single post
        const post = { name: 'Homework', slug: 'homework', description: 'Homework is challenging!'};
        
        res.render('pages/single', {post: post});
    } 
}