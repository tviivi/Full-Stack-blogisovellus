const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Blog = require('./models/blog')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to database', process.env.MONGODB_URI)
    })
    .catch(err => {
        console.log(err)
    })

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(middleware.logger)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use(middleware.error)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})