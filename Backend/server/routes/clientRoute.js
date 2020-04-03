
var express = require('express')
var router = express.Router()
var {Client} = require('../models/client');

const _ = require('lodash');
router.post('/', (req, res) => {
    var body = _.pick(req.body, ['name', 'email' , 'contact', 'gender' ]);
    var client = new Client(body);

    client.save().then((cli) => {
        res.status(200).send(cli);
    })
    .catch((e) => {
        res.status(400).send(e);
    })
});



  
router.get('/', (req , res) =>{
  
    
    Client.findByName(req.body.name).then((clients)=>{
        res.status(200).send({clients ,status : 200});
     }).catch((e)=> {
        res.status(400).send(e);
     })

})

  module.exports = router;