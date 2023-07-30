const User = require('../models/user_M')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')//because we have index.js in that file it directly goes to index.js

const register = async (req, res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{name: user.name},token})
}

const login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        throw new BadRequestError('Provide email and password')
    }

    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const passwordCheck = await user.comparePassword(password)
    if(!passwordCheck){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{name:user.name},token})
}

//for me the developer they actually shouldn't exist
const deleteAll = async (req, res) => {
    await User.deleteMany().then(()=>console.log('All initial  data has been deleted..'))
    res.status(StatusCodes.OK).json({msg: 'All initial  data has been deleted..'})
}
const getAllUsers = async (req, res) => {
    const all = await User.find({})
    res.status(StatusCodes.OK).json({all})
}



module.exports = {register, login, deleteAll, getAllUsers}