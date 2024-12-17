const validator  = require('validator')

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password} = req.body

    if(!firstName || !lastName){
        throw new Error("Invalid Name")
    } else if(!validator.isEmail(emailId)){
        throw new Error("Invalid EmailId")
    } else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password")
    }
}

const validateProfileEditFields = (req) => {
    const allowedFields = [
        "firstName",
        "lastName",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills",
    ]

    const isValidKeys = Object.keys(req.body).every((field) => 
        allowedFields.includes(field)
    )
    return isValidKeys
}

module.exports = {
    validateSignUpData,
    validateProfileEditFields
}