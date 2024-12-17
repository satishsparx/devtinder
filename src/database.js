const mongoose = require('mongoose')

const connectDB = async () => {
    return await mongoose.connect(
        "mongodb+srv://satishsparx:CNQI6wP6jjK4XNtW@cluster0.jlddt.mongodb.net/devtinder"
    )
}   

module.exports = connectDB