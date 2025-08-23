require('dotenv').config()

const express = require('express')
const cors = require('cors')

const taskRouter = require('./routers/route')
const taskMongoRouter = require('./routers/task.routes')
const userRouter = require('./routers/user.routes')
const app = express()

const origin = process.env.ALLOWED_ORIGIN

app.use(cors({
  origin: origin,                       // Only allow this origin
  methods: ['GET', 'POST'],             // Only allow these HTTP methods
  allowedHeaders: ['Content-Type'],     // Only allow these headers
}))

app.use(express.json())
app.use('/api/file/tasks', taskRouter)
app.use('/api/mongo/tasks', taskMongoRouter)
app.use('/api/users', userRouter)

app.get('/', (req, res) => {
  res.send('Welcome server')
})


module.exports = app