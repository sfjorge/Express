const express = require('express');
const path = require('path');
const logger = require('./middleware/logger.js');


const app = express(); // initiates express


// init middleware : middleware functions have access to the request and response object. 
app.use(logger);

// body parser middleware   -->    so that we can work with the post request of json data
app.use(express.json()); // allows us to work with the raw json data
app.use(express.urlencoded({extended: false})); // to be able to handle url encoded data

//create route
// app.get('/', (req,res) => {  // the '/' is the route for index page
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

//set static folder using express
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port ' + PORT));