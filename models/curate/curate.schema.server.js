const mongoose = require('mongoose')
const curateSchema = mongoose.Schema({
    title: String,
    description: String,
    movies: [String],
}, {collection: 'curate'})
module.exports = curateSchema
