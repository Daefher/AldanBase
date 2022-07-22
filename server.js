//Install express server
const express = require('express');
const path = require('path');
var cors = require('cors');


const app = express();

var corsOptions = {
    origin: 'https://aldantech.tk',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

//app.use(cors());
//Cors Configuration - Start
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, PATCH, GET, DELETE"
    )
    return res.status(200).json({})
  }
  next()
})
//Cors Configuration - End

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/AldanBase'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/AldanBase/index.html'));
});


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);