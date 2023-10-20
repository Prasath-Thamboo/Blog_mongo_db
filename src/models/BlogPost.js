const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
    title: String,
    description: String,
    //username: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "Blog post userid is required before to store data in db"]
    },
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: String
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

module.exports = BlogPost