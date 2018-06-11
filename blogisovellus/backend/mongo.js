const mongoose = require('mongoose')

const url = 'mongodb://fullstack:sekred1@ds115799.mlab.com:15799/blogdb'

mongoose.connect(url)

const blogSchema = new mongoose.Schema({
    subject: String,
    content: String,
    date: Date,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
    subject: 'Mongodb jee',
    content: 'HTML on helppoa',
    date: new Date(),
    likes: 0
})

// blog
//     .save()
//     .then(response => {
//         console.log('blog saved!')
//         mongoose.connection.close()
//     })

Blog
  .find({})
  .then(result => {
    result.forEach(blog => {
      console.log(blog)
    })
    mongoose.connection.close()
  })