// import the express library
const express = require('express')
const app = express()

// allows http request to be parsed using 'req.body'
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// express-session -- API for cookies
var session = require('express-session');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string' // encryption of cookie
}));

// Mongoose (CLI for mongoDB)
// connects to a mongo database
//test comment
const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/whiteboard-cs56100-sp20',
//     { useNewUrlParser: true, useUnifiedTopology: true })

// local host -- fetches whatever database is currently running
// movie_match -- is pointing at the collection within the current database
mongoose.connect('mongodb://localhost/movie_match',
                 { useNewUrlParser: true, useUnifiedTopology: true })

// Allows CORS from a particular URL, or "*" allows all URLs
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");

    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// Allows the other components to interact with http requests
// Called 'endpoints'
require('./controllers/quizzes.controller.server')(app)
require('./controllers/questions.controller.server')(app)
require('./controllers/users.controller.server')(app)
require('./controllers/session.controller.server')(app)
require('./controllers/movies.controller.server')(app)


app.get('/hello', (req, res) => res.send('hello world!'))

// port the server listens at
app.listen(3000)
