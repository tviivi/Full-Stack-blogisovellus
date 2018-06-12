const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
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

beforeAll(async () => {
    await Blog.remove({})

    for (let blog of initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api
        .get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api
        .get('/api/blogs')

    const contents = response.body.map(r => r.content)
    expect(contents).toContain('HTTP-protokollan tärkeimmät metodit ovat GET ja POST')
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        subject: 'Testiaihe',
        content: 'async/await yksinkertaistaa asynkronisten funktioiden kutsua',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api
        .get('/api/blogs')

    const contents = response.body.map(r => r.content)

    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(contents).toContain('async/await yksinkertaistaa asynkronisten funktioiden kutsua')
})

test('blog without content is not added ', async () => {
    const newBlog = {
        subject: 'hei me testataan',
        likes: 0
    }

    const intialBlogs = await api
        .get('/api/blogs')

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const response = await api
        .get('/api/blogs')

    expect(response.body.length).toBe(intialBlogs.body.length)
})

afterAll(() => {
    server.close()
})