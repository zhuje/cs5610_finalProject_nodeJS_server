// user  data access object  -- allow access to
// mongoDB
const userDao = require('../daos/users.dao.server')

module.exports = (app) => {

    // Register -- requests a new JSON object in the
    // mongo database and maps the actualUser (returned
    // JSON objected) to a key called 'profile' in the
    // session map.
    // Register a new User.
    // 1) 'user' -- from the http request get the
    // user information from 'req.body'.
    // 2) ' req.session['profile'] = actualUser'
    //  -- within session map the key 'profile'
    // to the JSON object 'actualUser' (newly created user in database)
    // 3) ' actualUser.password = '****' --
    const register = (req, res) => {
        const user = req.body
        userDao.createUser(user)
            .then(actualUser => {
                req.session['profile'] = actualUser
                actualUser.password = '****'
                res.send(actualUser)
            })
    }

    // req.session['profile'] -- fetch the value of the
    // key 'profile' in the session map. Then send it
    // back to the client
    const profile = (req, res) =>
        res.send(req.session['profile'])

    // Destroys the current session.
    // All information from the client
    // that was stored in session will be deleted.
    const logout = (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }

    // login -- takes in a username and password
    // from the client http POST request
    // and tries to find the matching object/document
    // in the mongo database
    const login = (req, res) => {
        const username = req.body.username
        const password = req.body.password
        userDao.findUserByCredentials(username, password)
            .then(actualUser => {
                req.session['profile'] = actualUser
                actualUser.password = '****'
                res.send(actualUser)
            })
    }

    app.post('/login', login)
    app.post('/logout', logout)
    // we want '/profile' to be a post so we can
    // hide the username and password in the body
    // rather than encoding it in the url
    app.post('/profile', profile)
    app.post('/register', register)
    app.post('/api/users', (req, res) => {
        const newUser = req.body
        userDao.createUser(newUser)
            .then(actualUser => res.send(actualUser))
    })





    //ok
    app.delete('/api/users/:userId', (req, res) => {
        const userId = req.params.userId;
        userDao.deleteUser(userId)
            .then(status => res.send(status))
    })

    // KEEP this version of LOGIN bc it has a else statement
    // findUserByCredential -- looks to see if there is an
    // object/document in the database that matches
    // the client's given 'username' and 'password'
    // then IF there is a matching object/document
    // return it to the client (after we modify the password)
    // ELSE -- user wasn't found and return the message along
    // with a '403' status (forbidden, unauthorized).
    // BUT needs to include 'req.session['profile'] = user'
    app.post('/api/login', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        userDao.findUserByCredentials(username, password)
            .then(user => {
                if(user) {
                    user.password = '****'
                    return res.send(user)
                } else {
                    return res.status(403).send({
                        message: `User ${username} not found`
                    })
                }
            })
    })


    app.get('/api/users', (req, res) =>
        userDao.findAllUsers()
            .then(allUsers => res.send(allUsers)))
}
