const User = require('../models/user_M')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')//because we have index.js in that file it directly goes to index.js


const register = async (req, res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
   // const token = '543'

    res.status(StatusCodes.CREATED).json({user:{name: user.name},token})
}

const login = async (req, res) => {
    res.send('login')
}

module.exports = {register, login}