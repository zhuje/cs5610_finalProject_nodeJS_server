const mongoose = require('mongoose')
const curateSchema = require('./curate.schema.server')
const curateModel = mongoose.model(
    'curateModel',
    curateSchema
)
module.exports = curateModel
