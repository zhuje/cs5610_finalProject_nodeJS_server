const userModel = require('../models/users.model.server')

const createUser = (user) => {
    return userModel.create(user)
}
const findAllUsers = () => {
    return userModel.find()
}
const findUserById = (userId) => {}
const findUserByCredentials =
    (username, password, role) => {
    return userModel.findOne(
        {
            username: username,
            password :password,
            role: role
        })
    }

const deleteUser = (uid) =>
    userModel.deleteOne({_id: uid})


const updateProfile = (uid, newEdits) =>
    userModel.findOneAndUpdate({_id: uid}, {$set: newEdits}, {upsert: true})

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
