# MovieMatch 
A website to search and save your favorite movies. 
Implements CRUD operations. 
Calls a third-party API to obtain movie details and graphics. 
Database is stored on MongoDB, which holds user's profile information and list of favorited movies by UUID from third party API. 

Responses to Angular Client: https://github.com/zhuje/cs5610_finalProject_angular_client 

## View Deployed Website on Heroku
http://movie-match-angular.herokuapp.com/

File Structure
This is the backend of the website MovieMatch. 

Other Libraries/Frameworks : Mongoose, MongoDB, Express

Components Directory : </br>
controllers : manages incoming requests from the client and routes them to a handler </br>
daos (data access object) : takes input from the controller and manipulates the database with commands .find(), .update(), .delete() </br>
model : defines an object model and schema to correlate with a database in MongoDB </br>

Website Capbilities: CRUD a user profile,  sign in and sign out of a profile, search IMDB's database of movies, and CRUD movie objects to your user profile

Full Documentation : https://www.notion.so/cs5610-collab-submissionForm-fdde9ccac5f04f97bebaf4057100042f
