const commentsRouter = require('express').Router()
const Comment = require('../models/comment')

commentsRouter.get('/', async (request, response) => {
    const comments = await Comment
        .find({})
        .populate('blogs', { subject: 1, content: 1, date: 1 })
    response.json(comments.map(Comment.format))
})

commentsRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        const comment = new Comment({
            content: body.content,
            date: new Date()
        })

        const savedComment = await comment.save()
        response.json(Comment.format(savedComment))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

module.exports = commentsRouter