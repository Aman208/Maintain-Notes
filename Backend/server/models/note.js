var mongoose = require('mongoose');

var Note = mongoose.model('Note', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
 
   time: {
    type: Number,
    default: null
  } ,

  client : {
    require:true ,
    type : mongoose.Schema.Types.ObjectId 
  },
  agent:{
    require:true ,
    type : mongoose.Schema.Types.ObjectId 
  }


});

module.exports = {Note};
