const express = require('express')
const authRouter = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

const { validateSignUpData } = require('../utils/validation')


authRouter.post('/signup', async (req, res) => {
    try {
        validateSignUpData(req)
        const { firstName, lastName, emailId, password} = req.body

        const passwordHash = await bcrypt.hash(password, 10)

        console.log(passwordHash)

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })

        const savedUser = await user.save();

        res.json({message: "User added successfully", data: savedUser})
    } catch(err){
        res.status(400).send("Error ::"+ err.message)
    }
})

authRouter.post('/login', async(req, res) => {

    try {
        const { emailId, password } =  req.body
        const user = await User.findOne({
            emailId
        })
        if(!user) {
            res.status(400).message("Invalid credentials")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        console.log(isPasswordValid)
        if(!isPasswordValid){
            res.status(400).send("Invalid credentials")
        } else {
            const token = await user.getJWTToken()

            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000)
            })
            res.send(user)
        }

    } catch(err){
        res.status(400).send("Something went wrong")
    }
})

authRouter.post('/logout', async(req, res) => {
    res.cookie("token", null,{
        expires: new Date(Date.now())
    })
    res.send("Logout successfull")
})

module.exports = authRouter

