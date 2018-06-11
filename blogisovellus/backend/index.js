const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))


let blogs = [
    {
        id: 1,
        subject: 'Kissablogi',
        content: 'Näin leikkaat kissasi kynnet',
        date: '2017-12-10T17:30:31.098Z',
        likes: 0
    },
    {
        id: 2,
        subject: 'Testaillaan',
        content: 'Jeejeejeejee',
        date: '2017-12-10T18:39:34.091Z',
        likes: 0
    },
    {
        id: 3,
        subject: 'Kuinka huollat moottoripyörääsi oikein?',
        content: 'SPpsdjfsokpsvmovnisdå a iåiapog hadfinoisäajrkgnd fpgäskdngk njöaoköärg.',
        date: '2017-12-10T19:20:14.298Z',
        likes: 0
    }
]

app.get('/api/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/blogs', (req, res) => {
    res.json(blogs)
})

app.get('/api/blogs/:id', (request, response) => {
    const id = Number(request.params.id)
    const blog = blogs.find(blog => blog.id === id)

    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
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

    const blog = {
        id: generateId(),
        subject: body.subject,
        content: body.content,
        date: new Date(),
        likes: 0
    }

    blogs = blogs.concat(blog)

    response.json(blog)
})

app.delete('/api/blogs/:id', (request, response) => {
    const id = Number(request.params.id)
    blogs = blogs.filter(blog => blog.id !== id)

    response.status(204).end()
})

const error = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(error)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})