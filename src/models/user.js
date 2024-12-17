const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    photoUrl: {
        type: String
    },
    about: {
        type: String,
        default: 'This is the default description'
    },
    skills: {
        type: Array
    }
})

userSchema.methods.getJWTToken = async function(){
    const user = this
    console.log(user)
    const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", { 
        expiresIn: '7d'
    })

    return token
}

module.exports = mongoose.model("User", userSchema)