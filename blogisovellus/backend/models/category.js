const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    category: String,
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

categoryommentSchema.statics.format = (category) => {
    return {
        id: comment.id,
        ccategory: comment.content,
        blogs: comment.blog
    }
}

const Category = mongoose.model('Category', categorySchema)

module.exports = Category