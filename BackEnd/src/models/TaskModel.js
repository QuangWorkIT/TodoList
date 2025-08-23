const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: String,
    des: String,
    dueDate: Date,
    done: Boolean
})

module.exports = mongoose.model('Task', taskSchema)