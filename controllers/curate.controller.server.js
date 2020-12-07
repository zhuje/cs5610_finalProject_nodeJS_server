const curateDao = require('../daos/curate.dao.server')

module.exports = (app) => {

    const findAllCuratedList = (req, res) => {
        console.log("reached find all curated list ")
        curateDao.findAllCuratedLists()
            .then(actualList => res.send(actualList))
    }

    const createCuratedList = (req, res) => {
        const newList = req.body;
        console.log('new newList : ' + newList);
        curateDao.createCuratedList(newList)
            .then(status => res.send(status));
    }


    const deleteCuratedList = (req, res) => {
        const listId = req.params.listId;
        curateDao.deleteCuratedList(listId)
            .then(status => res.send(status))
    }

    const addMovieToList = (req, res) => {
        const listID = req.params.listID;
        const newEdits = req.body;
        console.log('ADDMovieLIST  listId | movieId : ' + listID + " | " + JSON.stringify(newEdits));
        curateDao.addMovieToList(listID, newEdits)
            .then(actualList => res.send(actualList))
    }

    const deleteMovieInList = (req, res) => {
        const listID = req.params.listID;
        const newEdits = req.body;
        console.log('DELMovieLIST  listId | movieId : ' + listID + " | " + JSON.stringify(newEdits));
        curateDao.deleteMovieInList(listID, newEdits)
            .then(actualList => res.send(actualList))
    }


    app.get('/curate', findAllCuratedList)
    app.post('/curate/create', createCuratedList)
    app.delete('/curate/delete/:listId', deleteCuratedList)
    app.put('/curate/updateAdd/:listID', addMovieToList)
    app.put('/curate/updateDel/:listID', deleteMovieInList)


}
