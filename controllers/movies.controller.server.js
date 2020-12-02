const moviesDao = require('../daos/movies.dao.server')

module.exports = (app) => {

    const getMovieMatchDetails = (req,res) => {
        const mId = req.params.mId
        moviesDao.getMovieMatchDetails(mId)
            .then(actualMovieDetails => {
                res.send(actualMovieDetails)
            })
    }

    app.post('/details/:mId', getMovieMatchDetails)

}
