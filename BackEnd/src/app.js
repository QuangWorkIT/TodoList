const express = require('express')
const cors = require('cors')
const taskRouter = require('./routers/route')


require('dotenv').config()
const app = express()

const origin = process.env.ALLOWED_ORIGIN
app.use(cors({
  origin: origin,                       // Only allow this origin
  methods: ['GET', 'POST'],             // Only allow these HTTP methods
  allowedHeaders: ['Content-Type'],     // Only allow these headers
}))

app.use(express.json())
app.use('/api/tasks', taskRouter)


app.get('/', (req, res) => {
    res.send('Welcome server')
})


module.exports = app