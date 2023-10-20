const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide (required) username"],
        unique: [true, "Username must be unique"]
    },
    password: {
        type: String,
        required: [true, "Please provide (required) password"]
    }
})

UserSchema.plugin(uniqueValidator)

UserSchema.pre('save', async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
        next()
    } catch (error) {
        console.log(`hash password error => ${error}`)
    }
})

const User = mongoose.model('user', UserSchema)

module.exports = User