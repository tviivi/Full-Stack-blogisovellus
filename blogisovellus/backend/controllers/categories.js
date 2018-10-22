const categoriesRouter = require('express').Router()
const Category = require('../models/category')
const Blog = require('../models/blog')

categoriesRouter.get('/', async (request, response) => {
    const categories = await Category
        .find({})
        .populate('blogs', { subject: 1, content: 1, date: 1 })
    response.json(categories.map(Category.format))
})

categoriesRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        if (body.content === undefined) {
            return response.status(400).json({ error: 'name missing' })
        }

        const blog = await Blog.findById(body.blog.id)

        const category = new Category({
            content: body.content,
            blog: blog._id
        })

        const savedCategory = await category.save()

        blog.categories = blog.categories.concat(savedCategory._id)
        await blog.save()

        response.json(Category.format(savedCategory))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

module.exports = categoriesRouter