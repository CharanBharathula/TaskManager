const router = require('express').Router();
const bodyParser = require('body-parser');
let taskData = require('./data/tasks.json');
const validator = require('./validators/taskValidators.js');
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'data', 'tasks.json');
router.use(bodyParser.json());

router.get('/',(req,res)=>{
    fs.readFile(filePath,'utf-8',(err,data)=>{
        if(err){
            return res.status(500).json({error:"Unable to load data"});
        }
        return res.status(200).json(JSON.parse(data));
    });
});

router.post('/',(req,res) => {
    const taskDetails = req.body;
    try {
        const isValid = validator.validateTaskInfo(taskDetails);
        if(isValid.status && !validator.isTaskFound(taskDetails,taskData)){
            taskData.tasks.push(taskDetails);
            fs.writeFileSync(filePath,JSON.parse(taskData),'utf-8');
            return res.status(200).json(isValid);
        }else{
            return res.status(400).json(isValid);
        }
    } catch (error) {
        return res.status(500).json({"message" : "Task creation failed. Please try again later!"});
    }
});

router.get('/:id',(req,res)=>{
    const taskId = parseInt(req.params.id);
    fs.readFile(filePath, 'utf-8',(err, data)=>{
        if(err){
            return res.status(500).json({error:"Internal Server Error"});
        }
        const task = taskData.tasks.find(t => t.taskId === taskId);
        if(!task){
            return res.status(404).json({error:"Resource Not found"});
        }
        return res.status(200).json(task);
    });
});

router.put('/:id',(req, res)=>{
    let taskDetails = req.body;
    let taskId = parseInt(req.params.id);
    let isValid = validator.validateTaskInfo(taskDetails);
    if( isValid.status){
        if(validator.isTaskFound(taskDetails, taskData)){
            isValid.message = "Task have been updated successfully";
        }
        else{
            isValid.message = "Please check with data. Task was not unique";
            isValid.status = false;
            return res.status(400).json(isValid);
        }
        let taskDataModified = JSON.parse(JSON.stringify(taskData));
        taskDataModified.tasks[taskId-1] = taskDetails;
        fs.writeFileSync(filePath, JSON.stringify(taskDataModified), 'utf-8');
        return res.status(200).json(isValid);
    }
    return res.status(400).json(isValid);
});

router.delete('/:id',(req,res)=>{
    const task = taskData.tasks.find(ele => ele.taskId === parseInt(req.params.id));
    if( task && validator.isTaskFound(task, taskData)){
        const index = taskData.tasks.indexOf(task);
        taskData.tasks.splice(index, 1);
        fs.writeFileSync(filePath, JSON.stringify(taskData), 'utf-8');
        return res.status(200).send("Task Deleted successfully");
    }
    return res.status(404).send("Resource not found!");
});

module.exports = router;





