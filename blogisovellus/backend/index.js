const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Blog = require('./models/blog')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

const formatBlog = (blog) => {
    return {
        id: blog._id,
        subject: blog.subject,
        content: blog.content,
        date: blog.date,
        likes: blog.likes
    }
}

app.get('/api/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/blogs', (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs.map(formatBlog))
        })
})

app.get('/api/blogs/:id', (request, response) => {
    Blog
        .findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(formatBlog(blog))
            } else {
                response.status(400).send({ error: 'malformatted id' })
            }
        })
})

const generateId = () => {
    const maxId = blogs.length > 0 ? blogs.map(n => n.id).sort().reverse()[0] : 1
    return maxId + 1
}

app.post('/api/blogs', (request, response) => {
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

    blog
        .save()
        .then(savedBlog => {
            response.json(formatBlog(savedBlog))
        })
})

app.delete('/api/blogs/:id', (request, response) => {
    Blog
        .findByIdAndRemove(request.params.id)
        .then(blog => {
            response.status(204).end()
        })
        .catch(error => {
            response.status(400).send({ error: 'malformatted id' })
        })
})

app.put('/api/blogs/:id', (request, response) => {
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

const error = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(error)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})