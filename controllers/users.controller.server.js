const userDao = require('../daos/users.dao.server')

module.exports = (app) => {

    const register = (req, res) => {
        const user = req.body
        userDao.createUser(user)
            .then(actualUser => {
                req.session['profile'] = actualUser
                actualUser.password = '****'
                res.send(actualUser)
            })
    }

    const profile = (req, res) =>
        res.send(req.session['profile'])

    const logout = (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }

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
    app.post('/profile', profile)
    app.post('/register', register)

    app.post('/api/users', (req, res) => {
        const newUser = req.body
        userDao.createUser(newUser)
            .then(actualUser => res.send(actualUser))
    })
    app.delete('/api/users/:userId', (req, res) => {
        const userId = req.params.userId;
        userDao.deleteUser(userId)
            .then(status => res.send(status))
    })
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
