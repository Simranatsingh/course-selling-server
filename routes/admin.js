const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.post('/signup', (req,res)=>{  
    const {namee,password}=req.headers;
    console.log("successfully recieved credentials");
    const admin = {
        namee: "Simran",
        password: "21"
    }
     if(admin){
     const {coursename,description,price} =req.body;
     const newcourse =new course({coursename,description,price})
    newcourse.save()
    .then(() => {
        res.status(201).send("course added successfully!");
    })
    .catch((error) => {
        res.status(400).send("Error adding course: " + error.message);
    });
     }  
     else{
        console.log("you are not the admin :D");
     }  
})

router.get('/checkcourse', async (req, res) => {
    console.log("inside admin/checkcourse");
    try {
        const courses = await course.find({});
        console.log("Course data:", courses);
        res.json(courses);
    } catch (err) {
        console.log("Error reading data", err);
        res.status(500).send("Error reading data");
    }
});

module.exports =router;
