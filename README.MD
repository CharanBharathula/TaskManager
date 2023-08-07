Airtribe Task Manager app
The functionalities supported
1. Add tasks
2. View all the tasks
3. View the task information
4. View tasks by filtering and sorting
5. Update task
6. Delete task
7. View task based on priority level
Packages to be installed
body-parser
express
Commands to be run
Installing the packages - npm install
Starting the server - node index.js
1. API to create the task
    Method: POST
    Payload:
        {
            "taskId": "5",
            "title": "test",
            "description": "Big O Notation",
            "creationDate": "2009-12-10T18:30:00.000Z",
            "priorityLevel": "medium",
            "status": false
        }
    API - http://localhost:3000/tasks/
2. API to get all task
    Method: GET
    API - http://localhost:3000/tasks/
3. API to get task by id
    Method: GET
    API - http://localhost:3000/tasks/1
4. API to update task
    Method: PUT
    Payload -
       {
        "priorityLevel": "medium",
        "status": false
        }
    API - http://localhost:3000/tasks/4
5. API to delete task
    Method: DELETE
    API - http://localhost:3000/tasks/4