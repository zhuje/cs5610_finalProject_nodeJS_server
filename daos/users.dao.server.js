//data access objects - design pattern
//encapsulated database operations dedicated to Users model

const userModel = require('../models/users.model.server')

//create() in mongoose = insert() in mongoDB
const createUser = (user) => {
    return userModel.create(user)
}

//explicit return since only returning one line of code
const findAllUsers = () => {
    return userModel.find()
}

const findUserById = (userId) => {}

const findUserByCredentials =
    (username, password) => {
    return userModel.findOne(
        {
            username: username,
            password :password
            // role: role
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
