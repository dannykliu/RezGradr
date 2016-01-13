'use strict'
let express = require('express');
let path = require('path');
let config = require('./config/config.js');
let bodyParser = require('body-parser');
let multer = require('multer');
    
let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use(multer({ dest: './images/'}).single('resume'));

// Set the view directory to /views
app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('hogan-express'));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);
app.set('host', config.host);

require('./routes/routes.js')(express, app, multer);

let server = require('http').createServer(app);
 
//set our app listen on the port we specify
server.listen(app.get('port'), function(){
    //app.get('name') just gets name-value pair
    console.log('Project XXX working on port: ' + app.get('port'));
})
