const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

commentsRouter.get('/', async (request, response) => {
    const comments = await Comment
        .find({})
        .populate('blog', { subject: 1, content: 1, date: 1 })
        .populate('user', { username: 1, name: 1 })
    response.json(comments.map(Comment.format))
})

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

commentsRouter.post('/', async (request, response) => {
    const body = request.body

    try {
        const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        if (body.content === undefined) {
            return response.status(400).json({ error: 'content missing' })
        }

        const blog = await Blog.findById(body.blogId)
        const user = await User.findById(decodedToken.id)

        const comment = new Comment({
            content: body.content,
            date: new Date(),
            user: user._id,
            blog: blog.id
        })

        console.log(comment)

        const savedComment = await comment.save()

        user.comments = user.comments.concat(savedComment._id)
        await user.save()

        blog.comments = blog.comments.concat(savedComment._id)
        await blog.save()

        response.json(Comment.format(savedComment))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

module.exports = commentsRouter