const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    first: String,
    last: String,
    email: String,
    movies: [String],
    role: String
}, {collection: 'users'})
module.exports = userSchema
