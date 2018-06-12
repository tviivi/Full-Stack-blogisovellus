const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    subject: String,
    content: String,
    date: Date,
    likes: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

blogSchema.statics.format = (blog) => {
    return {
        id: blog._id,
        subject: blog.subject,
        content: blog.content,
        date: blog.date,
        likes: blog.likes
    }
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog