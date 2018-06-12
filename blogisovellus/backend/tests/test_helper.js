const Blog = require('../models/blog')

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

const format = (blog) => {
    return {
        subject: blog.subject,
        content: blog.content,
        likes: blog.likes,
        id: blog._id
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
    return blogs.map(format)
}

module.exports = {
    initialBlogs, format, nonExistingId, blogsInDb
}