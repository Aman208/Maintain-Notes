const mongoose = require('mongoose');
const validator = require('validator');


var ClientSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email'
      }
    },
    gender: {
      type: String,
      require: true,
    },
    contact : {
      type: String,
      require: true,
    }
  
});

// ClientSchema.methods.toJSON = function () {
//   var client = this;
//   var cliObject = client.toObject();
//   return _.pick(cliObject, ['_id','email']);
// };

ClientSchema.statics.findByEmail = function(email){
  var Client = this;

  return Client.findOne({
    email: email
  })
}

ClientSchema.statics.findByName = async function(name){
    var Client = this;

   return await Client.find({ "name":  {$regex:name ,$options :'i'} }).limit(5);
  

}

ClientSchema.statics.findByContact = function(contact){
    var Client = this;
  
    return Client.findOne({
      contact: contact
    })
  }  




var Client = mongoose.model('Client', ClientSchema);

module.exports = {Client}