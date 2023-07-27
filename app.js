//require
require ('dotenv').config()
require ('express-async-errors')

const express = require('express')
const app = express()

const notfound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const connectDB = require('./db/connect')

//app.use, functions, and variablles assigning
app.use('/', (req, res) =>{
    res.send('for now')
})
app.use(notfound)
app.use(errorHandler)

const port = process.env.PORT || 3000

connectDB()

//app.listen
app.listen(process.env.PORT, ()=> {
    console.log(`listening on ${port}`)
})