const app = require('./app')
const PORT = 3000
const mongoose = require('mongoose')
require('dotenv').config()

// env variables to connect to mongoDB
const mongoUri = process.env.MONGODB_URI
const dbName = process.env.DBNAME

function main() {
    app.listen(PORT, () => {
        try {
            mongoose.connect(mongoUri, { dbName: dbName || "tododb" })
            console.log(`Server is running on port ${PORT} and connected to db`)
        } catch (error) {
            console.log('Error connecting to database ', error)
        }
    })
}

// running server
main()