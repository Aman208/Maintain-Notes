var express = require('express')
var router = express.Router()
var {Note} = require('../models/note');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {authenticate } = require('../middleware/authenticate');

router.post('/add', authenticate , (req, res) => {
    
        var note = new Note({
        text: req.body.text ,
        agent : req.agent._id ,
        client : req.body.clientId ,
        time:  new Date().getTime()
        });
    
        note.save().then((doc) => { res.status(200).send(doc);} ,
         (e) => { res.status(400).send(e); });
});
  
router.post('/', authenticate ,(req, res) => {
       
        Note.find({client : req.clientId  }).limit(10)
        .then((notes) => {
        res.status(200).send({notes});
        }, (e) => {
        res.status(400).send(e);
        });
});
  
 
  
router.delete('/:id',authenticate ,  (req, res) => {
        var id = req.params.id;
    
        if (!ObjectID.isValid(id)) {
        return res.status(404).send();
        }
    
        Note.findByIdAndRemove({
        _id : id , agent : req.agent._id
        }).then((note) => {
        if (!note) {
            return res.status(404).send("Not Found");
        }
    
        res.status(200).send({note});
        }).catch((e) => {
        res.status(400).send("Error Deletion");
        });

});
  
  router.patch('/:id', authenticate, (req, res) => {
    var id = req.params.id;

    var body = _.pick(req.body, ['text', 'time']);
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

  
    Note.findOneAndUpdate({
    _id : id ,
    agent : req.agent._id
    },
     {$set: body}, {new: true}
    ).then((note) => {
      if (!note) {
        return res.status(404).send("Not FOund");
      }
  
      res.status(200).send({note});
    }).catch((e) => {
      res.status(400).send("Error Editing");
    })
  });
  
  module.exports = router;