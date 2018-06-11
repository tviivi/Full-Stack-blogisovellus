const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    subject: String,
    content: String,
    date: Date,
    likes: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog