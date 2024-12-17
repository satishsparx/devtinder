const express = require('express')
const { userAuth } = require('../middlewares/auth')
const { validateProfileEditFields } = require('../utils/validation')

const profileRouter = express.Router()

profileRouter.get('/profile/view', userAuth, (req, res) => {
    try {
        const user = req.user

        res.send(user)
    } catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
})

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try{
        if(!validateProfileEditFields){
            throw new Error("Invalid fields")
        }
    
        const loggedInUser = req.user;
    
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))
    
        await loggedInUser.save();
    
        res.json({
          message: `${loggedInUser.firstName}, your profile updated successfuly`,
          data: loggedInUser,
        })
    } catch(err){
        res.status(400).send("ERROR: "+ err.message)
    }
    
})

module.exports = profileRouter