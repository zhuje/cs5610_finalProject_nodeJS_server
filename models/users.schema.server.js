const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    movies: [String],
    role: String,
    firstNameHide: Boolean,
    lastNameHide: Boolean,
    emailHide:  Boolean,
}, {collection: 'users'})
module.exports = userSchema
