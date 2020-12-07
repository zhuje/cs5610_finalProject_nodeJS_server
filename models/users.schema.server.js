
//created schema to be used in mongoose model (User)
//follows structure of mongoDB schema
const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    movies: [String],
    role: String
}, {collection: 'users'})
module.exports = userSchema

//connects to collection called users
//export in order to use outside of file
