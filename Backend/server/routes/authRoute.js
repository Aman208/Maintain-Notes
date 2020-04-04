
var express = require('express')
var router = express.Router()
var {Agent} = require('../models/agent');
const _ = require('lodash');
var bcrypt = require('bcryptjs');
var {authenticate} = require('../middleware/authenticate');


router.post('/', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var agent = new Agent(body);

    agent.save().then(() => {
      return agent.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(agent);
    }).catch((e) => {
      res.status(400).send("Some Error Occurs");
    })
});

router.post('/login', (req, res) => { 

  var body = _.pick(req.body, ['email', 'password']);
  Agent.findByEmail(body.email).then( (agent) => {
    
    if(!agent){
       return  Promise.reject();
    }
     bcrypt.compare(body.password, agent.password).then( respo => {
        if(respo === true)
        {  agent.generateAuthToken().then((token) => {
          res.header('x-auth', token).send({'token':token});
        })   
        }
        else{

           res.status(200).send("Password Does Not MAtch");
        }
  })

  }).catch( e =>
  {
     res.status(401).send(e);
  })

})

router.delete('/logout' ,authenticate , (req , res) =>{

  req.agent.removeToken(req.token).then( () =>{
    res.status(200).send("Logout done")
  }).catch((e) =>{
    res.status(400).send(e);
  })

})

router.get('/me'  , authenticate  , (req , res) =>{
  
  res.send(req.agent);

})

  module.exports = router;
