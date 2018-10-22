const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    content: String,
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

categorySchema.statics.format = (category) => {
    return {
        id: category.id,
        content: category.content,
        blogs: category.blogs
    }
}

const Category = mongoose.model('Category', categorySchema)

module.exports = Category