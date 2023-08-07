class validator{
    static validateTaskInfo(taskDetails){
        if(taskDetails.hasOwnProperty("taskId") &&
            taskDetails.hasOwnProperty("title") &&
            taskDetails.hasOwnProperty("description") &&
            taskDetails.hasOwnProperty("status") && 
            taskDetails.hasOwnProperty("creationDate") &&
            taskDetails.hasOwnProperty("priority")){
                let errorMsg = "";
                if(taskDetails.title === '' || taskDetails.title === null){
                    errorMsg += "Title cannot be empty. ";
                } 
                if(taskDetails.description === '' || taskDetails.description === null){
                    errorMsg += "Description cannot be empty. ";
                } 
                if(typeof taskDetails.status !== "boolean"){
                    errorMsg += "Status should be a boolean value. ";
                } 
                if(errorMsg.length !== 0){
                    return {
                        "status": false,
                        "message": errorMsg
                      };
                } else {
                    return {
                        "status": true,
                        "message": "Task has been added."
                    };
                }
        }
        return {
            "status": false,
            "message": "Task Info is malformed. Please provide all the properties."
          }
    }
    

    static isTaskFound(taskDetails, taskData) {
        let valueFound = taskData.tasks.some(el => el.taskId === taskDetails.taskId);
        if(valueFound) return true;
        return false;
    }
}

module.exports = validator;