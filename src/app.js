// Creating the server

const express = require('express')
const cookieParser = require('cookie-parser')
const connectDB = require('./database')

const authRouter = require('./routes/auth.route')
const profileRouter  = require('./routes/profile.route')

const app = express()

app.use(express.json())
app.use(cookieParser())


app.use('/', authRouter)
app.use('/', profileRouter)

connectDB()
    .then(() => {
        console.log("Database is successfully connected")
        app.listen('4000',() => {
            console.log("Server listening on port 4000")
        })
    })
    .catch((err) => {
        console.log("Database cannot be connected")
    })
