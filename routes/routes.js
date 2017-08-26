const express = require('express'),
      router  = express.Router(),
      Contact = require('../models/contact');

//  Reterieve contacts
router.get('/contacts',(req,res)=>{
    // res.send('Contact page');
    Contact.find({}, function(err, contacts){
        if(err) console.log(err);
        res.json(contacts);
    })
});


// Add contacts
router.post('/contacts',(req, res, next)=>{
    // Logic to add contact
    // console.log(req.body);
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone
    });

    newContact.save((err,contact)=>{
        if(err){
            res.json({msg: 'Failed to add contact'});
        }else{
            res.json({msg: 'Sucessfully added new contact'});
        }
    });
});


// Delete contacts
router.delete('/contacts/:id',(req,res,next)=>{
    // logic to delete contact

    Contact.remove({_id: req.params.id} ,function(err, result){
        if(err){
            res.json({"err" : err});
        }else{
            res.json({"msg": result});
        }
    })
})

module.exports = router;