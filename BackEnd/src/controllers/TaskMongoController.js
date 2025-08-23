const TaskModel = require('../models/TaskModel')

// retrieving all tasks
const getTasks = async (req, res) => {
    const tasks = await TaskModel.find()

    tasks.length === 0 ? (
        res.status(404).json({ message: "Task not found" })
    ) : (
        res.status(200).json({ message: "Success", tasks: tasks })
    )
}

// creating new tasks
const addTasks = async (req, res) => {
    const { title, des, dueDate, done } = req.body
    const dateParse = new Date(dueDate)
    if (!title || !des || isNaN(dateParse.getTime()) || done === undefined) {
        console.log('title ' + title + " des " + des + " dueDate " + dueDate + " done " + done)
        return res.status(400).json({ message: "Invalid data" })
    }

    const task = new TaskModel({ title, des, dueDate, done })
    task.save()
        .then(() => {
            res.status(200).json({ message: "Success", task: task })
        })
        .catch((error) => {
            console.log('Error adding task ', error)
            res.status(500).json({ message: "Fail to add task" })
        })
}

module.exports = {
    getTasks,
    addTasks
}