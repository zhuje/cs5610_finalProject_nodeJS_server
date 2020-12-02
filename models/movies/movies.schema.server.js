const mongoose = require('mongoose')
const moviesSchema = mongoose.Schema({
                                         movieId: String,
                                         usersThatAddedMovie: [String],
                                         numTimesAdded: [Number]
                                     }, {collection: 'movies'})
module.exports = moviesSchema
