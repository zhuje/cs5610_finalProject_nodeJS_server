const curateModel = require('../models/curate/curate.model.server')

const findAllCuratedLists = () =>
       curateModel.find((err, doc) => {
           if (err) {
               console.log("Something wrong when updating data!");
           }
           console.log(doc);
       });

const createCuratedList = (newList) => {
    return curateModel.create(newList)
}


const deleteCuratedList = (listId) =>
    curateModel.deleteOne(
        {_id: listId},
        (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
        }
    );


module.exports = {
    findAllCuratedLists,
    createCuratedList,
    deleteCuratedList
}