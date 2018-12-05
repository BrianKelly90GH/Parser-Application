const path = require('path');

//Require the config.js file
const config = require('./config/config');

//Require the Express module 
const express = require('express');

//Init the application
const server = express();

//Require the body-parser module
const bodyParser = require('body-parser');

//Parse incoming json data
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

//Load the views that will be used in thais application engine
server.set('views', path.join(__dirname, 'views/pages'));

//Set view engine to pug
server.set('view engine', 'pug');

//Require the index route file
const index = require('./routes/index-route');

//Use the index route went any request comes in on '/'
server.use('/', index);

//Start the application
server.listen(config.port, () => {
    console.log(`server listening on ${config.port}`);
});