

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect( "mongodb://127.0.0.1:27017/ClientNotes" , {useNewUrlParser : true ,useUnifiedTopology: true ,
  useCreateIndex: true,
  useFindAndModify: false
 } ).then(con=>{
    console.log('Databse connected successfully');
    
}).catch ( err => console.log(err));