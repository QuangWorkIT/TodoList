const UserModel = require('../models/UserModel')

const getUsers = async (req, res) => {
    const users = await UserModel.find()

    users.length === 0 ? (
        res.status(404).json({ message: "User not found" })
    ) : (
        res.status(200).json({ message: "Success", users: users })
    )
}

const addUsers = async (req, res) => {
    const { name, age } = req.body
    if (!name || !age) {
        return res.status(400).json({ message: "Invalid data" })
    }

    const user = new UserModel({ name, age })
    user.save()
        .then(() => {
            res.status(200).json({ message: "Success", user: user })
        })
        .catch((error) => {
            console.log('Error creating user ', error)
            res.status(500).json({ message: "Fail to create user" })
        })
}


module.exports = {
    getUsers,
    addUsers
}