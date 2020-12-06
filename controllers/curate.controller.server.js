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
            .then(status => res.sendStatus(200));
    }

    const deleteCuratedList = (req, res) => {
        const listId = req.params.listId;
        curateDao.deleteCuratedList(listId)
            .then(status => res.send(status))
    }

    app.get('/curate', findAllCuratedList)
    app.post('/curate/create', createCuratedList)
    app.delete('/curate/delete/:listId', deleteCuratedList)



}
