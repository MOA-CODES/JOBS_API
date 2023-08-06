//require
require ('dotenv').config()
require ('express-async-errors')

//security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const eRateLimit = require('express-rate-limit')

//Swagger imports 
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

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

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))//swagger ui setup for docs
app.get('/', (req, res)=>{
    res.send('<h1>Hiring API</h1><p>This is an API made for:</p><li>Registering Users</li><li>Logging in Users</li><p>Provided you have the right authorization after logging in you can perform:</p>\
    <li>Creating Jobs for a User</li>\
    <li>Getting a Job made by a User</li><li>Getting all Jobs made by a User</li><li>Deleting a Job made by a User</li><li>Updating a Job made by a User</li>\
    <p>This api can be accessed by attaching "/api/v1/" at the end of the URL </p><p>Use "/auth" for the login and register routes and "/jobs" for the other routes</p>\
    <p>There is no front-end currently for the app, its a purely a backend app</p>\
    <p><i><u><a href="/api-docs">for more detailed documentation click here</a></i></u></p>\
    <h3><p><b>Made by <i><a href="https://github.com/MOA-CODES">MOA-CODES</a></i></b></P></h3>')
})

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