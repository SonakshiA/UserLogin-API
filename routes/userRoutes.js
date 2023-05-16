const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/',(req,res) => {
    res.redirect('/users');
})

router.get('/users',(req,res) => {
    User.find().then((result) => {
        res.send(result)
    });
});


router.post('/users/register', async (req,res) => {
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        const user = new User({username:req.body.username,password:hashedPassword});
        user.save().then((result) => res.send('User added')).catch((err) => console.log(err))
    }catch{
        res.status(500).send('error');
    }
})

router.post('/users/login', async (req,res) => {
    User.findOne({username: req.body.username}).then(async (result) => {
        try{
            if(result!=null){
                if (await bcrypt.compare(req.body.password,result.password)){
                     res.status(200).send('Log In Succesful')
                }else{
                     res.status(401).send('Password Incorrect')
                }
            }else{
                res.status(401).send('User Not Found')
            }
        }catch{
            res.status(500).send();
        }
    }).catch(err => {
        res.status(500).send();
    })
})

module.exports = router;