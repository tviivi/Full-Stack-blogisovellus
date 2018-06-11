const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const url = process.env.MONGODB_URI

mongoose.connect(url)

const blogSchema = new mongoose.Schema({
    subject: String,
    content: String,
    date: Date,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog