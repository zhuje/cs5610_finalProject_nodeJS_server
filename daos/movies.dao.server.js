const moviesModel = require('../models/movies/movies.model.server')

const getMovieMatchDetails = (mId) =>
     moviesModel.findOne({movieId: mId})

// add user to MovieDetails
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
// remove user from MovieDetails
const updateMovieDetailsRemoveUser = async (mId, uId) =>
    await moviesModel.findOneAndUpdate(
        {movieId: mId},
        {$pull: {usersThatAddedMovie: uId}},
        {upsert: true, new: true},
        (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
        });

module.exports = {
    getMovieMatchDetails,
    updateMovieDetailsAddUser,
    updateMovieDetailsRemoveUser,
}
