//Install express server
const express = require('express');
const path = require('path');
var cors = require('cors');


const app = express();

var corsOptions = {
    origin: 'https://aldantech.tk',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions));

// Serve only the static files form the dist directory
//app.use(express.static(__dirname + '/dist/AldanBase'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/AldanBase/index.html'));
});


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);