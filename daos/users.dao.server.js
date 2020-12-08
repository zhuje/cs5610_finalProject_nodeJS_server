const userModel = require('../models/users.model.server')

const createUser = (user) => {
    return userModel.create(user)
}

const findAllUsers = () => {
    return userModel.find()
}

const findUserById = (userId) => {
    console.log("userId from DAO :" + userId);
    const doc = userModel.findOne({_id: userId})
    console.log("findUserById DAO: " + doc)
    return doc;
}

const findUserByCredentials = (username, password) => {
        return userModel.findOne(
            {
                username: username,
                password: password
            })
    }

const deleteUser = (uid) =>
    userModel.deleteOne({_id: uid})

// updates the User 'movies' array
const updateProfile = (uid, newEdits) =>
    userModel.findOneAndUpdate(
        {_id: uid},
        {$addToSet: newEdits},
        {upsert: true, new: true},
        (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
        });

// This is for updating all the other user fields
const updateProfile2 = (uid, newEdits) =>
    userModel.findOneAndUpdate(
        {_id: uid},
        {$set: newEdits},
        {upsert: true, new: true},
        (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc + "updateProfile2");
        });

module.exports = {
    createUser,
    findAllUsers,
    findUserById,
    findUserByCredentials,
    deleteUser,
    updateProfile,
    updateProfile2
}
