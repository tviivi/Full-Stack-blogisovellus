const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: String,
    date: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }
})

commentSchema.statics.format = (comment) => {
    return {
        id: comment.id,
        content: comment.content,
        date: comment.date,
        user: comment.user,
        blog: comment.blog
    }
}

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment