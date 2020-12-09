const userDao = require('../daos/users.dao.server')

module.exports = (app) => {

    const register = (req, res) => {
        const user = req.body
        userDao.createUser(user)
            .then(actualUser => {
                req.session['profile'] = actualUser
                //actualUser.password = '****'
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
                if(actualUser) {
                    req.session['profile'] = actualUser
                    //actualUser.password = '****'
                    res.send(actualUser)
                } else {
                    return res.status(403).send(
                        {
                                errorMessage: `User ${username} not found or wrong password.`
                            })
                }
            })
    }

    // updates the User 'movies' array
    const updateProfile = (req, res) => {
        const uid = req.params.uid;
        const newEdits = req.body;
        console.log('updateProfile uid : ' + uid + ' newEdits : ' + JSON.stringify(newEdits))
        userDao.updateProfile(uid, newEdits)
            .then(actualUser => res.json(actualUser))
    }

    // This is for updating all the other user fields
    const updateProfile2 = (req, res) => {
        const uid = req.params.uid;
        const newEdits = req.body;
        console.log('updateProfile2* uid : ' + uid + ' newEdits : ' + JSON.stringify(newEdits))
        userDao.updateProfile2(uid, newEdits)
            .then(actualUser => {
                req.session['profile'] = actualUser;
                res.json(actualUser);
            })
    }


    const findUserById = (req, res) => {
        const uid = req.params.uid;
        userDao.findUserById(uid)
            .then(actualUser => res.send(actualUser))
    }

    app.post('/findUserById/:uid', findUserById)
    app.put('/update/:uid', updateProfile)
    app.put('/updateProfile/:uid', updateProfile2)
    app.post('/login', login)
    app.post('/logout', logout)
    app.post('/profile', profile)
    app.post('/register', register)




    /*
           ALL BELOW  TO BE DELETE -- double check they are unnecessary
     */


    app.post('/api/users', (req, res) => {
        const newUser = req.body
        userDao.createUser(newUser)
            .then(status => res.sendStatus(200))
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




    // Session -- API for Cookies tutorial
    app.get('/api/session/set/:name/:value',
            setSession);
    app.get('/api/session/get/:name',
            getSession);
    app.get('/api/session/get',
            getSessionAll);
    app.get('/api/session/reset',
            resetSession);

    function setSession(req, res) {
        var name = req.params['name'];
        var value = req.params['value'];
        req.session[name] = value;
        res.send(req.session);
    }

    function getSession(req, res) {
        var name = req.params['name'];
        var value = req.session[name];
        res.send(value);
    }

    function getSessionAll(req, res) {
        res.send(req.session);
    }
    function resetSession(req, res) {
        req.session.destroy();
        res.send(200);
    }











}

