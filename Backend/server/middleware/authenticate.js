const {Agent} = require('../models/agent');
const _ = require('lodash');

const authenticate = (req , res , next) => {

  let token = req.header("x-auth");
 

  Agent.findByToken(token).then( (agent) => {
    if(!agent){
       return  Promise.reject();
    }
    req.token= token ;
    req.agent = agent ;
    next();
  }).catch(e =>
  {
     res.status(401).send();
  })

}


module.exports= {authenticate};