const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/UserController')
// route for retrieving users
userRouter.get('/', userController.getUsers)

// route for creating users
userRouter.post('/', userController.addUsers)

module.exports = userRouter