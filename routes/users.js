
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const{users,courses}=require('../db');
const { usersmiddleware } = require('../middlewares');


router.post('/signin',usersmiddleware,async(req,res)=>{
    const{username, password}=req.body;
    const user=await usersmiddleware.findOne({username,password});
    try{
        const user=await users.findOne({username,password});
        if(!user){
            return res.status(401).json({
                msg:'authentication failed'
            });
        }
        else{
        res.json({
      msg:'user logged in successfully', userId:user._id

    })}
} catch(err){
     res.status(500).json({
        msg:'server error during signin'
     })
}
});


router.post('/signup', async (req,res)=>{
    const {username, password} = req.body;
    console.log("successfully received credentials");
    try{
    const newuser= await new users.create({username,password});
   
        console.log("credentials saved successfully");
        res.status(201).json({
            msg:'user saved success'
        }) }
    catch(err) {
        console.error('error saving data:',err);
    res.status(500).json({
        msg:'error registering'
    }) ;
}});


router.get('/courses',async (req,res)=>{
    try{
        const courses=await courses.find({});
    res.json({
        courses:courses
    });}
    catch(err){
        res.status(500).json({
            msg:'error getting courses'
        }); }
})


router.post('/courses/:courseId',usersmiddleware,async (req,res)=>{
    const {username, password} = req.headers;
    const {courseId}=req.params
    try{
        const user=await users.findOne({username, password});
        if(!user){
            return res.status(404).json({
                msg:"user not found"
            });
        }
        const course=await courses.findById(courseId);
        if(!course){
            res.status(404).json({
                msg:'Course not found'
            }); }

            if (user.purchasedcourses.includes(courseId)) {
                return res.status(400).json({
                    msg: "Course already purchased"
                });
            }
    
            await users.findByIdAndUpdate(user._id, {
                $push: { purchasedcourses: courseId }
            });
    
            console.log("Course bought successfully");
            res.json({
                msg: 'Purchase complete'
            });
        } catch (err) {
            console.error('Purchase error:', err);
            res.status(500).json({
                msg: "Purchase failed"
            });
        }
    });

router.get('/purchasedcourses',usersmiddleware, async(req,res)=>{
    const {username,password}=req.body;
    try{
    const user= await users.findOne({username,password})
    if(!user){
        return res.status(404).json({
            msg:"user not found"
        });
    }

    /home/simran/Downloads/practice space/course/routes/admin.js:41
    const courses=await courses.findOne({});
                  ^

ReferenceError: Cannot access 'courses' before initialization
    at /home/simran/Downloads/practice space/course/routes/admi
    const purchasedcourses= await courses.find({
        _id:{
            '$in':user.purchasedcourse
        }
    })
    res.json({
        courses:purchasedcourses
    })}
    catch (err) {
        res.status(500).json({
            msg: "Error fetching purchased courses"
        });
    }
});

module.exports =router;



