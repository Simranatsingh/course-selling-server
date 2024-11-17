
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userinfo = mongoose.model('Userinfo');


router.post('/signup', (req,res)=>{
    const {namee,password}=req.body;
    console.log("successfully recieved credentials, signing you up");
    const newuser =new userinfo({namee,password})
    newuser.save()
    .then(() => {
        res.status(201).send("User signed up successfully!");
    })
    .catch((error) => {
        res.status(400).send("Error signing up user: " + error.message);
    });
})



router.get('/checkcourse', (req,res)=>{
    
    userinfo.find({}, (err,users)=>
        {
        if(err){
            console.log("error reading data")
            return res.status(500).send("Error reading data");
        }
        else{
            console.log("userdata-",users)
            return res.json(users); }})
})

module.exports =router;
