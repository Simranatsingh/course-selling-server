const express = require('express');
const app = express();
const port = 3000;
const adminroutes= require('./routes/admin');
const userroutes= require('./routes/users')
const bodyParser = require('body-parser');


app.use(express.json());
app.use('/admin', adminroutes);
app.use('/users', userroutes);


app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
    })