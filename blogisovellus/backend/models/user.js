const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
})

userSchema.statics.format = (user) => {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    blogs: user.blogs,
    comments: user.comments
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User