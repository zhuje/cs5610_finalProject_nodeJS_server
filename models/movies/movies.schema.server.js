const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const moviesSchema = mongoose.Schema({
                                         movieId: String,
                                         usersThatAddedMovie: [String],
                                         numTimesAdded: [Number]
                                     }, {collection: 'movies'})
module.exports = moviesSchema
