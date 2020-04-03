const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
var bcrypt = require('bcryptjs');

var AgentSchema = new mongoose.Schema({
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
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});


AgentSchema.methods.toJSON = function () {
  var agent = this;
  var agentObject = agent.toObject(); 
  return _.pick(agentObject, ['_id', 'email']);
};

var JWT_SECRET = "pojiaj234oi234oij234oij4";

AgentSchema.methods.generateAuthToken = function () {
  var agent = this;
  var access = 'auth';
  var token = jwt.sign({_id: agent._id.toHexString(), access}, JWT_SECRET).toString();

  agent.tokens.push({access, token});
  return agent.save().then(() => {
    return token;
  });
};

AgentSchema.statics.findByToken= function(token) {
  var Agent = this;
  var decode;
  try{
    decode = jwt.verify(token , JWT_SECRET);
  }
  catch(e){
    return  Promise.reject();
  }

  return Agent.findOne({
    '_id' : decode._id ,
    'tokens.token' : token ,
    'tokens.access' :'auth'

  })

}

AgentSchema.statics.findByEmail = function(email){
  var Agent = this;

  return Agent.findOne({
    email: email
  })


}

AgentSchema.pre('save', function(next) {
  let agent = this;

   if(agent.isModified('password')){
    
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(agent.password, salt, function(err, hash) {
        agent.password = hash;
        next();
    });
}) 
   }
   else{
    next();
   }


});

AgentSchema.methods.removeToken = function(token){
  let agent = this;

  return agent.update({
    $pull : { tokens : {token : token}}
  })

}

var Agent = mongoose.model('Agent', AgentSchema);

module.exports = {Agent}