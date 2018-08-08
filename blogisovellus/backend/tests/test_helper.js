const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        subject: 'Tämä on blogin aihe',
        content: 'HTML on helppoa',
        likes: 0
    },
    {
        subject: 'Tämä on toisen blogin aihe',
        content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
        likes: 0
    }
]

const formatBlog = (blog) => {
    return {
        subject: blog.subject,
        content: blog.content,
        likes: blog.likes,
        id: blog._id
    }
}

const formatUser = (user) => {
    return {
        username: user.username,
        name: user.name,
        token: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RpIiwiaWQiOiI1YjFmYTk2OTY2ZjEwNjU2NDA5ZTExNmUiLCJpYXQiOjE1MzEzODM1ODN9.xNIW9vYgTUBgbQoUYuAnN8WDKq1iF0NcWa7AdM86Hd8"
    }
}

const nonExistingId = async () => {
    const blog = new Blog()
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(formatBlog)
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(formatUser)
}

module.exports = {
    initialBlogs, formatBlog, formatUser, nonExistingId, blogsInDb, usersInDb
}