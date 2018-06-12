const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
    return {
        id: blog._id,
        subject: blog.subject,
        content: blog.content,
        date: blog.date,
        likes: blog.likes
    }
}

blogsRouter.get('/', async (req, res) => {
    // Blog
    //     .find({})
    //     .then(blogs => {
    //         res.json(blogs.map(formatBlog))
    //     })

    const blogs = await Blog.find({})
    res.json(blogs.map(formatBlog))
})

blogsRouter.get('/:id', (request, response) => {
    Blog
        .findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(formatBlog(blog))
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            response.status(400).send({ error: 'malformatted id' })
        })
})

blogsRouter.post('/', async (request, response) => {
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
    response.json(formatBlog(savedBlog))
})

blogsRouter.delete('/:id', (request, response) => {
    Blog
        .findByIdAndRemove(request.params.id)
        .then(blog => {
            response.status(204).end()
        })
        .catch(error => {
            response.status(400).send({ error: 'malformatted id' })
        })
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
            response.json(formatBlog(updatedBlog))
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

module.exports = blogsRouter