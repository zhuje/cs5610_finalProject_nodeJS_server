const curateModel = require('../models/curate/curate.model.server')

const findAllCuratedLists = () =>
       curateModel.find((err, doc) => {
           if (err) {
               console.log("Something wrong when updating data!");
           }
           console.log(doc);
       });

const createCuratedList = (movie) => {
    return curateModel.create(movie)
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

// const addMovieToList = (listID, newEdits) =>
//     curateModel.findOneAndUpdate(
//         {_id: listID},
//         {$addToSet: newEdits},
//         {upsert: true, new: true},
//         (err, doc) => {
//             if (err) {
//                 console.log("Something wrong when updating data!");
//             }
//             console.log(doc);
//         });
//
// const deleteMovieInList = (listID, newEdits) =>
//     curateModel.findOneAndUpdate(
//         {_id: listID},
//         {$pull: newEdits},
//         { new: true},
//         (err, doc) => {
//             if (err) {
//                 console.log("Something wrong when updating data!");
//             }
//             console.log(doc);
//         });



module.exports = {
    findAllCuratedLists,
    createCuratedList,
    deleteCuratedList,
    // addMovieToList,
    // deleteMovieInList
}
