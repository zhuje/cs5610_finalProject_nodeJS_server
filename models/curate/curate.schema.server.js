const mongoose = require('mongoose')
const curateSchema = mongoose.Schema({
    movieID: String,
    movieObject: {}
}, {collection: 'curate'})
module.exports = curateSchema

//mongoose.Schema({ any: {} }),
