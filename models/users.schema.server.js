const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    first: String,
    last: String,
    email: String,
    movies: [String]
}, {collection: 'users'})
module.exports = userSchema
