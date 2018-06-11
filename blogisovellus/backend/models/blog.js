const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    subject: String,
    content: String,
    date: Date,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog