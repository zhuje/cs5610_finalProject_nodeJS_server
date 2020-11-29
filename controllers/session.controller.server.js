// 'app' -- is the express instance
// data access object 'app' allows us to
// access functions within the express library
// using dot notation
module.exports = (app) => {

    // Sets  unique identifier for the session.
    // From the URL we parse the 'name' and
    // 'value' and use that information
    // as an client's identifier.
    function setSession(req, res) {
        var name = req.params['name'];
        var value = req.params['value'];
        req.session[name] = value;
        res.send(req.session);
    }

    // Get the 'name' from the URL and use it
    // as a key to get the value in the 'session'.
    function getSession(req, res) {
        var name = req.params['name'];
        var value = req.session[name];
        res.send(value);
    }

    // Destroys the session on this client.
    // All stored information in the session
    // will be deleted.
    function resetSession(req, res) {
        req.session.destroy()
        res.status(200)
    }

    app.get('/api/session/set/:name/:value',
        setSession);
    app.get('/api/session/get/:name',
        getSession);
    // app.get('/api/session/get',
    //     getSessionAll);
    app.get('/api/session/reset',
        resetSession);
}
