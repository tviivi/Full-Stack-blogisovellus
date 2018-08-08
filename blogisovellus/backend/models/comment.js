const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: String,
    date: Date,
    likes: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

commentSchema.statics.format = (comment) => {
    return {
        id: comment.id,
        content: comment.content,
        date: comment.date,
        user: comment.user,
        likes: comment.likes,
        blog: comment.blog,
        users: comment.users
    }
}

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment