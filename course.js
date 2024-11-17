const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
app.use(express.json());
const adminroutes= require('./routes/admin');
const userroutes= require('./routes/users')




mongoose.connect("mongodb+srv://stuckmonstertruck:Mongodb7jhehe@cluster0.taezolz.mongodb.net/coursesell")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

const userinfo=mongoose.model('Userinfo',{namee: String ,password: String});
const course=mongoose.model('course',{coursename:String, description:String, price:String});

app.use('/admin', adminroutes);
app.use('/users', userroutes);


app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
    })