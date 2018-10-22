const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    subject: String,
    content: String,
    date: Date,
    likes: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
})

blogSchema.statics.format = (blog) => {
    return {
        id: blog._id,
        subject: blog.subject,
        content: blog.content,
        date: blog.date,
        likes: blog.likes,
        user: blog.user,
        comments: blog.comments,
        users: blog.users,
        categories: blog.categories
    }
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog