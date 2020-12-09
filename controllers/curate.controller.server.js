const curateDao = require('../daos/curate.dao.server')

module.exports = (app) => {

    const findAllCuratedList = (req, res) => {
        console.log("reached find all curated list ")
        curateDao.findAllCuratedLists()
            .then(actualList => res.send(actualList))
    }

    const createCuratedList = (req, res) => {
        const movie = req.body;
        console.log('new newList : ' + JSON.stringify(movie));
        curateDao.createCuratedList(movie)
            .then(status => res.send(status));
    }


    const deleteCuratedList = (req, res) => {
        const listId = req.params.listId;
        curateDao.deleteCuratedList(listId)
            .then(status => res.send(status));
    }

    // const addMovieToList = (req, res) => {
    //     const listID = req.params.listID;
    //     const newEdits = req.body;
    //     console.log('ADDMovieLIST  listId | movieId : ' + listID + " | " + JSON.stringify(newEdits));
    //     curateDao.addMovieToList(listID, newEdits)
    //         .then(actualList => res.send(actualList))
    // }
    //
    // const deleteMovieInList = (req, res) => {
    //     const listID = req.params.listID;
    //     const newEdits = req.body;
    //     console.log('DELMovieLIST  listId | movieId : ' + listID + " | " + JSON.stringify(newEdits));
    //     curateDao.deleteMovieInList(listID, newEdits)
    //         .then(actualList => res.send(actualList))
    // }


    app.get('/curate', findAllCuratedList)
    app.post('/curate/create', createCuratedList)
    app.delete('/curate/delete/:listId', deleteCuratedList)
    // app.put('/curate/updateAdd/:listID', addMovieToList)
    // app.put('/curate/updateDel/:listID', deleteMovieInList)


}



// {
//     "_id": "5fcc423a4d16b440015b54ee",
//     "movies": [
//     "tt0068646",
//     "tt0071562",
//     "tt0099674"
// ],
//     "description": "I know it was you Fredo. You broke my heart.",
//     "title": "The GodFather Triology",
//     "__v": 0,
//     "pull": [
//     "tt0266543"
// ]
// },
