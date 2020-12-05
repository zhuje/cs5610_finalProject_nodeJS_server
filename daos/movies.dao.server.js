const moviesModel = require('../models/movies/movies.model.server')

const getMovieMatchDetails = (mId) =>
     moviesModel.findOne({movieId: mId})

const updateMovieDetailsAddUser = async (mId, uId) =>
    await moviesModel.findOneAndUpdate(
        {movieId: mId},
        {$addToSet: {usersThatAddedMovie: uId}},
        {upsert: true, new: true},
        (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
        });

module.exports = {
    getMovieMatchDetails,
    updateMovieDetailsAddUser
}
