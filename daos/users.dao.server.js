const userModel = require('../models/users.model.server')

const createUser = (user) => {
    return userModel.create(user)
}
const findAllUsers = () => {
    return userModel.find()
}
const findUserById = (userId) => {
    console.log("userId from DAO :" +  userId);
    const doc = userModel.findOne({ _id: userId})
    console.log("findUserById DAO: " + doc)
    return doc;
}

const findUserByCredentials =
    (username, password) => {
    return userModel.findOne(
        {
            username: username,
            password :password
        })
    }

const deleteUser = (uid) =>
    userModel.deleteOne({_id: uid})


const updateProfile = (uid, newEdits) =>
    userModel.findOneAndUpdate(
        {_id: uid},
        {$addToSet: newEdits},
        {upsert: true}
        )

// const updateProfile = (qid) =>{
//     return userModel.update(
//         { _id: "jenny"},
//         {$set: {"pizza": 'pepperoni'}}
//         )
// }


module.exports = {
    createUser,
    findAllUsers,
    findUserById,
    findUserByCredentials,
    deleteUser,
    updateProfile
}
