const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

const formatUser = (user) => {
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      notes: user.blogs
    }
  }
  
  usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(formatUser))
  })

module.exports = usersRouter