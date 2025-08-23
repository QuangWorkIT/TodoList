const express = require('express')
const taskRouter = express.Router()
const taskController = require('../controllers/TaskMongoController')

// route for retrieving tasks
taskRouter.get('/', taskController.getTasks)

// route for creating new tasks
taskRouter.post('/', taskController.addTasks)

module.exports = taskRouter