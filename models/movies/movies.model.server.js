const mongoose = require('mongoose')
const moviesSchema = require('./movies.schema.server')
const moviesModel = mongoose.model(
    'moviesModel',
    moviesSchema
)
module.exports = moviesModel
