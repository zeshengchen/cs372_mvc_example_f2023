const mongoose = require('mongoose'),
    Schema = mongoose.Schema

// create a schema
const postSchema = new Schema({
    name: String,
    slug: {
        type: String,
        unique: true
    },
    description: String
})

// middleware section
// make sure that the slug is created from the name
postSchema.pre('save', (next) => {
    this.slug = slugify(this.name)
    next()
})

// create the model
const postModel = mongoose.model('Post', postSchema)

// export the model
module.exports = postModel

// function to slugify a name
function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '')             // Trim - from end of text
}
