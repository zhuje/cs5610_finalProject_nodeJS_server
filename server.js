// import the express library
const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const User = require('./models/users.model.server');
//our atlas cluster uri for mongoDB
// const MONGO_URI =
// "mongodb+srv://jeannille:cs5610f20@movie-app-cluster.eqlwa.mongodb.net/movie_match?"

const MONGO_URI = "mongodb+srv://jeannille:cs5610f20@movie-app-cluster.n9z04.mongodb.net/movie_match?retryWrites=true&w=majority";

//update access atlas cluster string, via process.env variable, instead of hardcoded like above
//heroku has config vars set
// const uri = process.env.MONGODB_URI;

// allows http request to be parsed using 'req.body'
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Mongoose (CLI for mongoDB)
// connects to a mongo database
const mongoose = require('mongoose')

// local host -- fetches whatever database is currently running
// movie_match -- is pointing at the collection within the current database
//https://movie-app-match.herokuapp.com/

//mongoose connect to local
// mongoose.connect('mongodb://localhost/movie_match',
//connect mongoose to mongoDB (schema created in models dir)
mongoose.connect("mongodb+srv://jeannille:cs5610f20@movie-app-cluster.eqlwa.mongodb.net/movie_match?retryWrites=true&w=majority",
                 {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// express-session -- API for cookies
//lecture - session should be after mongoose connect but before we declare endpoints
var session = require('express-session');
app.use(session({
                    resave: false,
                    saveUninitialized: true,
                    secret: 'any string' // encryption of cookie
                }));

// Allows CORS from a particular URL, or "*" allows all URLs
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin",
               "http://localhost:4200");
    res.header("Access-Control-Allow-Headers",
               "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
               "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// Allows the other components to interact with http requests called 'endpoints'
require('./controllers/quizzes.controller.server')(app)
require('./controllers/questions.controller.server')(app)
require('./controllers/users.controller.server')(app)
require('./controllers/session.controller.server')(app)
require('./controllers/movies.controller.server')(app)
// require('./controllers/curate.controller.server')(app)

app.get('/hello', (req, res) => res.send('hello world!'))

// port the server listens at
app.listen(3000)

// async function main(){
//     /**
//      * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your
// cluster. * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details */
async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your
     * cluster. See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    // const uri = "mongodb+srv://jeannille:cs5610f20@movie-app-cluster/test?retryWrites=true&w=majority";
    const uri = "mongodb+srv://jeannille:cs5610f20@movie-app-cluster.eqlwa.mongodb.net/movie_match?retryWrites=true&w=majority"

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

/**
 * Print the names of all available databases
 * @param {MongoClient} client A MongoClient that is connected to a cluster
 */
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

//successful test to add a User doc to atas cluster movie_match/users collection
// const newUser = new User({
//                              username: 'TEST_USER_ATLAS', password: 'password'
//                          })
// newUser.save().then(item => console.log(item))
//     .catch(err => console.log(err));
