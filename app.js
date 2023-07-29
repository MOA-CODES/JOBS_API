//require
require ('dotenv').config()
require ('express-async-errors')
const connectDB = require('./db/connect')
const express = require('express')
const app = express()

const auth_R = require('./routes/auth_R')
const jobs_R = require('./routes/jobs_R')

const notfound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')



//app.use, functions, and variablles assigning
app.use(express.json())

app.use('/api/v1/auth',auth_R )
app.use('/api/v1/jobs',jobs_R )


app.use(notfound)
app.use(errorHandler)

const port = process.env.PORT || 3000

connectDB()

//app.listen
app.listen(process.env.PORT, ()=> {
    console.log(`listening on ${port}`)
})