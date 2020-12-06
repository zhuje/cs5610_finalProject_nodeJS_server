// import the express library
const { MongoClient } = require('mongodb');
const express = require('express')
const app = express()
//import user model, create and save to database
const User = require('./models/users.model.server');



// use the express-static middleware
//app.use(express.static("public"));
//access atlas cluster via process.env
// const uri = process.env.MONGODB_URI;

// allows http request to be parsed using 'req.body'
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
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
const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/whiteboard-cs56100-sp20',
//     { useNewUrlParser: true, useUnifiedTopology: true })

// local host -- fetches whatever database is currently running
// movie_match -- is pointing at the collection within the current database
mongoose.connect('mongodb://localhost/movie_match',
                 {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

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

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://jeannille:cs5610f20@movie-app-cluster.eqlwa.mongodb.net/sample_mflix?retryWrites=true&w=majority"
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await  listDatabases(client);

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

const newUser = new User({
                             username: 'testUser', password: 'password'
                         })
newUser.save().then(item => console.log(item))
    .catch(err => console.log(err));
