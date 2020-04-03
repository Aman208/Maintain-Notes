const express = require('express');
var app = express();
const port = process.env.PORT || 3000;

//require('./config/config');
require("./mongoose.js");
  
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());


 var authRoute = require('./routes/authRoute');

 var clientRoute = require('./routes/clientRoute');

var notesRoute = require('./routes/notesRoute');


app.use('/client', clientRoute);

app.use('/auth' , authRoute);

app.use('/notes' , notesRoute);

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
  
});

module.exports = {app};


//https://codepen.io/jasperlachance/pen/ZWOoBQ