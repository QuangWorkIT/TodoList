const fs = require('fs').promises

const getTasks = async (req, res) => {
    try {
        const data = await fs.readFile('./src/Tasks.txt', 'utf-8')
        const tasks = JSON.parse(data)
        res
            .status(200)
            .json({
                total: tasks.length,
                tasks: tasks
            })
    } catch (error) {
        console.log('Error while reading file ', error)
        res
            .status(500)
            .json({ error: "Invalid JSON format" })
    }
}

const addTask = async (req, res) => {
    try {
        const { tasks } = req.body
        if (!tasks) {
            res
            .status(400)
            .json({ error: "Invalid tasks" })
            return
        }

        await fs.writeFile('./src/Tasks.txt', JSON.stringify(tasks, null, 2), 'utf-8')

        const fetchTasks = await fs.readFile('./src/Tasks.txt', 'utf-8')
        console.log('File saved successfully')
        res
            .status(200)
            .json({ message: 'save task success', tasks: JSON.parse(fetchTasks) })
    } catch (error) {
        console.log('Error write file ', error)
        res
            .status(500)
            .json({ error: "Invalid data type" })
    }
}

module.exports = {
    getTasks,
    addTask
}