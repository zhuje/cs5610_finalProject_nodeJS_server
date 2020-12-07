//creating User Model - this loads userSchema to create mongoose model that will
//interact with database

const mongoose = require('mongoose')
const userSchema = require('./users.schema.server')
const userModel = mongoose.model(
    'UserModel',
    userSchema
)
module.exports = userModel

//user model provides us w/ CRUD operations that interact w database

