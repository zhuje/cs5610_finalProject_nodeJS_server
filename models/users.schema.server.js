const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    first: String,
    last: String
}, {collection: 'users'})
module.exports = userSchema
