const moviesDao = require('../daos/movies.dao.server')

module.exports = (app) => {

    const getMovieMatchDetails = (req,res) => {
        const mId = req.params.mId
        moviesDao.getMovieMatchDetails(mId)
            .then(actualMovieDetails => {
                res.send(actualMovieDetails)
            })
    }

    const updateMovieDetailsAddUser =  (req, res) => {
        const mId = req.params.mId;
        const uId = req.body.uId;
        console.log("USERSID IS : " + uId);
        moviesDao.updateMovieDetailsAddUser(mId, uId)
            .then(actualMovieDetails => {
                res.send(actualMovieDetails)
            })
    }

    const updateMovieDetailsRemoveUser =  (req, res) => {
        const mId = req.params.mId;
        const uId = req.body.uId;
        console.log("updateMovieDetailsRemoveUser **  MovieID IS : " + uId);
        console.log("updateMovieDetailsRemoveUser **  USERSID IS : " + uId);
        moviesDao.updateMovieDetailsRemoveUser(mId, uId)
            .then(actualMovieDetails => {
                res.send(actualMovieDetails)
            })
    }



    app.post('/details/:mId', getMovieMatchDetails)
    app.post('/details/:mId/update', updateMovieDetailsAddUser)
    app.post('/details/:mId/remove', updateMovieDetailsRemoveUser)


}
