// // import the express library
// const express = require('express')
// const app = express()
//
// // allows http request to be parsed using 'req.body'
// var bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
//
// // express-session -- API for cookies
// var session = require('express-session');
// app.use(session({
//     resave: false,
//     saveUninitialized: true,
//     secret: 'any string' // encryption of cookie
// }));
//
// // Mongoose (CLI for mongoDB)
// // connects to a mongo database
// const mongoose = require('mongoose')
// // mongoose.connect('mongodb://localhost:27017/whiteboard-cs56100-sp20',
// //     { useNewUrlParser: true, useUnifiedTopology: true })
//
// // local host -- fetches whatever database is currently running
// // movie_match -- is pointing at the collection within the current database
// mongoose.connect('mongodb://localhost/movie_match', // TODO mongoATLAS
//                  { useNewUrlParser: true, useUnifiedTopology: true })
//
// // try {
// //     mongoose.connect(
// //         'mongodb+srv://admin:admin@movie-match-cluster.6c1jv.mongodb.net/movie_match?retryWrites=true&w=majority'
// //         ,
// //         {useNewUrlParser: true, useUnifiedTopology: true}, () =>
// //             console.log("connected"));
// // } catch (error) {
// //     console.log("could not connect");
// // }
//
//
//
// // Allows CORS from a particular URL, or "*" allows all URLs
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin",
//         "http://localhost:4200"); // TODO ANGULAR HEROKU DEPLOY
//
//     res.header("Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods",
//         "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
// });
//
// // Allows the other components to interact with http requests
// // Called 'endpoints'
// require('./controllers/users.controller.server')(app)
// require('./controllers/session.controller.server')(app)
// require('./controllers/movies.controller.server')(app)
// require('./controllers/curate.controller.server')(app)
//
// // app.get('/hello', (req, res) => res.send('hello world!'))
//
// // port the server listens at
// app.listen(3000)


// import the express library
const express = require('express')
const app = express()
app.set('trust proxy',1);

const PORT = process.env.PORT || 3000

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var session = require('express-session');
app.use(session({
                    resave: false,
                    saveUninitialized: false,
                    secret: 'any string',
                    cookie : {
                        sameSite: 'none', // Allows cookies from different site
                        secure: true
                    }
                }));


const mongoose = require('mongoose')
const uri = 'mongodb+srv://admin:admin@movie-match-cluster.6c1jv.mongodb.net/movie_match?retryWrites=true&w=majority'
const localDB = 'mongodb://localhost/movie_match'
mongoose.connect(uri || localDB, { useNewUrlParser: true, useUnifiedTopology: true })


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
               "http://movie-match-angular.herokuapp.com/"); // TODO ANGULAR HEROKU DEPLOY

    res.header("Access-Control-Allow-Headers",
               "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
               "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});



require('./controllers/users.controller.server')(app)
require('./controllers/session.controller.server')(app)
require('./controllers/movies.controller.server')(app)
require('./controllers/curate.controller.server')(app)


//app.listen(3000)
app.listen(PORT, console.log(`Server is starting at ${PORT}`))
