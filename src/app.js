// Creating the server

const express = require('express')

const app = express()

app.use('/',(req, res)=> {
    res.send("Hi there!!! This is DevTinder app")
})

app.listen('4000',() => {
    console.log("Server listening on port 4000")
})