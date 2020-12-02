const moviesModel = require('../models/movies/movies.model.server')

const getMovieMatchDetails = (mId) =>
     moviesModel.findOne({movieId: mId})


module.exports = {
    getMovieMatchDetails,
}
