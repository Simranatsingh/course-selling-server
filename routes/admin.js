const express = require('express');
const router = express.Router();
const { admin, courses } = require('../db');
const { adminmiddleware } = require('../middlewares');


router.post('/signup', (req,res)=>{  
    const {username, password} = req.body;
    console.log("successfully received credentials")
    const newuser= new admin({username,password});
    newuser.save().then(()=>
    {
       console.log("credentials saved successfully");
    }).catch((err)=> {
       console.error('error saving data:',err);
    })
})

router.post('/signin', async (req,res)=>{
  const{username, password}=req.headers;

  res.json({
    msg:'user logged in successfully'
  })
})


router.post('/courses',adminmiddleware, async(req,res)=>{ 
    const {username,password}=req.headers;
    const {title, description, imagelink, price}=req.body;
const newcourse= await courses.create({
    title, description, imagelink, price
});
console.log(newcourse);
res.json({
    msg:'course created successfully', courseId: newcourse._id
})
})

router.get('/courses',async (req,res)=>{
    const courses=await courses.findOne({});
    res.json({
        courses:response
    })
})

module.exports = router;

