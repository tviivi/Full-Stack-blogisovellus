const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, format, nonExistingId, blogsInDb, usersInDb } = require('./test_helper')

describe('when there is initially some blogs saved', async () => {
    beforeAll(async () => {
        await Blog.remove({})

        const blogObjects = initialBlogs.map(b => new Blog(b))
        await Promise.all(blogObjects.map(b => b.save()))
    })

    test('all blogs are returned as json by GET /api/blogs', async () => {
        const blogsInDatabase = await blogsInDb()

        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(blogsInDatabase.length)

        const returnedContents = response.body.map(b => b.content)
        blogsInDatabase.forEach(blog => {
            expect(returnedContents).toContain(blog.content)
        })
    })

    test('individual blogs are returned as json by GET /api/blogs/:id', async () => {
        const blogsInDatabase = await blogsInDb()
        const aBlog = blogsInDatabase[0]

        const response = await api
            .get(`/api/blogs/${aBlog.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.content).toBe(aBlog.content)
    })

    test('404 returned by GET /api/blogs/:id with nonexisting valid id', async () => {
        const validNonexistingId = await nonExistingId()

        const response = await api
            .get(`/api/blogs/${validNonexistingId}`)
            .expect(404)
    })

    test('400 is returned by GET /api/blogs/:id with invalid id', async () => {
        const invalidId = "5a3d5da59070081a82a3445"

        const response = await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400)
    })
})

describe('addition of a new blog', async () => {
    // test('POST /api/blogs succeeds with valid data', async () => {
    //     const blogsAtStart = await blogsInDb()

    //     const newBlog = {
    //         subject: 'Testiaihe',
    //         content: 'async/await yksinkertaistaa asynkronisten funktioiden kutsua',
    //         likes: 0
    //     }

    //     await api
    //         .post('/api/blogs')
    //         .send(newBlog)
    //         .expect(200)
    //         .expect('Content-Type', /application\/json/)

    //     const blogsAfterOperation = await blogsInDb()

    //     expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)

    //     const contents = blogsAfterOperation.map(r => r.content)
    //     expect(contents).toContain('async/await yksinkertaistaa asynkronisten funktioiden kutsua')
    // })

    // test('POST /api/blogs fails without content', async () => {
    //     const newBlog = {
    //         subject: 'hei me testataan',
    //         likes: 0
    //     }

    //     const blogsAtStart = await blogsInDb()

    //     await api
    //         .post('/api/blogs')
    //         .send(newBlog)
    //         .expect(400)

    //     const blogsAfterOperation = await blogsInDb()

    //     const contents = blogsAfterOperation.map(r => r.content)

    //     expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
    // })

    test('POST /api/blogs fails if user is not logged in', async () => {
        const newBlog = {
            subject: 'hei me testataan',
            content: 'blogin sisältöä',
            likes: 0
        }

        const blogsAtStart = await blogsInDb()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)

        const blogsAfterOperation = await blogsInDb()

        const contents = blogsAfterOperation.map(r => r.content)

        expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
    })
})

describe('deletion of a blog', async () => {
    let addedBlog

    beforeAll(async () => {
        addedBlog = new Blog({
            subject: 'DELETE-testausta',
            content: 'poisto pyynnöllä HTTP DELETE',
            likes: 0
        })
        await addedBlog.save()
    })

    test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {
        const blogsAtStart = await blogsInDb()

        await api
            .delete(`/api/blogs/${addedBlog._id}`)
            .expect(204)

        const blogsAfterOperation = await blogsInDb()

        const contents = blogsAfterOperation.map(r => r.content)

        expect(contents).not.toContain(addedBlog.content)
        expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)
    })
})

describe('when there is initially one user at db', async () => {
    beforeAll(async () => {
        await User.remove({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()
    })

    test('POST /api/users succeeds with a fresh username', async () => {
        const usersBeforeOperation = await usersInDb()
        console.log(usersBeforeOperation)

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
        const usernames = usersAfterOperation.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual({ error: 'username must be unique' })

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    })
})

afterAll(() => {
    server.close()
})