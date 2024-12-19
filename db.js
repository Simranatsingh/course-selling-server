const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://stuckmonstertruck:Mongodb7jhehe@cluster0.taezolz.mongodb.net/coursesell")

const admin_schema=new mongoose.Schema({
    name:String,
    password:String
})
const users_schema=new mongoose.Schema({
    name:String,
    password:String
})

const courses_schema=new mongoose.Schema({
    title:String,
    description:String,
    price:String,
    imagelink:String,
    purchasedcourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'courses'
    }]
})

const purchasedcourseschema=new mongoose.Schema({
    name:String,
    password:String
})

const admin= mongoose.model('admin',admin_schema);
const users= mongoose.model('users',users_schema);
const courses= mongoose.model('courses',courses_schema);

module.exports={
    admin,
    users,
    courses
}