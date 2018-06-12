const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs.map(Blog.format))
})

blogsRouter.get('/:id', async (request, response) => {
    try {
        const blog = await Blog.findById(request.params.id)

        if (blog) {
            response.json(Blog.format(blog))
        } else {
            response.status(404).end()
        }

    } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'malformatted id' })
    }
})

blogsRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        if (body.subject === undefined) {
            return response.status(400).json({ error: 'subject missing' })
        }
        if (body.content === undefined) {
            return response.status(400).json({ error: 'content missing' })
        }

        const blog = new Blog({
            subject: body.subject,
            content: body.content,
            date: new Date(),
            likes: 0
        })

        const savedBlog = await blog.save()
        response.json(Blog.format(savedBlog))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)

        response.status(204).end()
    } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'malformatted id' })
    }
})

blogsRouter.put('/:id', (request, response) => {
    const body = request.body

    const blog = {
        subject: body.subject,
        content: body.content,
        likes: body.likes
    }

    Blog
        .findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(Blog.format(updatedBlog))
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

module.exports = blogsRouter