const express = require('express');
const bodyParser = require('body-parser');
const tasksInfo = require('./taskInfo.js')

const app = express();
app.use(bodyParser.json());

PORT = 4040;

app.listen(PORT, (error)=>{
    if(error){
        console.log("Error Occured");
    }
    else{
        console.log("Server Started Successfully");
    }
});

app.get('/',(req,res)=>{
    return res.status(200).send("Welcome to Task Manager");
});

app.use('/tasks',tasksInfo);