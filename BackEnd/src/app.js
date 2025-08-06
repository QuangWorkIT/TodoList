const express = require('express')
const cors = require('cors')
const fs = require('fs').promises

require('dotenv').config()
const app = express()

const origin = process.env.ALLOWED_ORIGIN
app.use(cors({
  origin: origin, // Only allow this origin
  methods: ['GET', 'POST'],             // Only allow these HTTP methods
  allowedHeaders: ['Content-Type'],     // Only allow these headers
}))

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome server')
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await fs.readFile('./src/Tasks.txt', 'utf-8')
        res
            .status(200)
            .json(JSON.parse(tasks))
    } catch (error) {
        console.log('Error while reading file ', error)
        res
            .status(500)
            .json({ error: "Invalid JSON format" })
    }
})

app.post('/tasks', async (req, res) => {
    try {
        const { tasks } = req.body
        if (!tasks) {
            res
                .status(400)
                .json({ error: "Invalid tasks" })
            return
        }

        await fs.writeFile('./src/Tasks.txt', JSON.stringify(tasks, null, 2), 'utf-8')
        console.log('File saved successfully')
        res.json({ message: 'save task success', tasks: tasks })
    } catch (error) {
        console.log('Error write file ', error)
        res
            .status(500)
            .json({ error: "Invalid data type" })
    }
})

module.exports = app