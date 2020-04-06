

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;


mongoose.connect( "mongodb+srv://aman208:atlas208@cluster0-ss781.mongodb.net/NotesApp?retryWrites=true&w=majority" , {useNewUrlParser : true ,useUnifiedTopology: true ,
  useCreateIndex: true,
  useFindAndModify: false
 } ).then(con => {
    console.log('Databse connected successfully');

    
}).catch ( err => console.log(err));