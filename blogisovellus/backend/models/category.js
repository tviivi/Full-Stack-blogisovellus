const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    category: String,
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

categorySchema.statics.format = (category) => {
    return {
        id: category.id,
        content: category.content,
        blogs: category.blog
    }
}

const Category = mongoose.model('Category', categorySchema)

module.exports = Category