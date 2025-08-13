const express = require('express')
const router = express.Router()
const taskController = require('../controllers/TaskController')

// route get tasks
router.get('/', taskController.getTasks)


// route create task
router.post('/', taskController.addTask)


module.exports = router