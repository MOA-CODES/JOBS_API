//require
require ('dotenv').config()
require ('express-async-errors')

//security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const eRateLimit = require('express-rate-limit')
//

const express = require('express')
const app = express()

const auth = require('./middleware/authentication')
const connectDB = require('./db/connect')

const auth_R = require('./routes/auth_R')
const jobs_R = require('./routes/jobs_R')

const notfound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

//app.use, functions, and variablles assigning
app.set('trust proxy', 1);
app.use(eRateLimit({
    windowMs: 15 * 60 * 1000, //15minutes
    max: 100, // limit each Ip to 100 requests per windowMs
}))

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())


app.use('/api/v1/auth',auth_R )
app.use('/api/v1/jobs', auth, jobs_R ) //protecting all job routes with authentication middleware


app.use(notfound)
app.use(errorHandler)

const port = process.env.PORT || 3000

connectDB()

//app.listen
app.listen(process.env.PORT, ()=> {
    console.log(`listening on ${port}`)
})