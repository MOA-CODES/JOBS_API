const Job = require('../models/job_M')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({count: jobs.length, jobs})
}

const getJob = async (req, res) => {
    const {user:{userId}, params:{id:jobId}} = req
    //const job = await Job.findOne({_id: jobId}).where({createdBy: userId})
    const job = await Job.findOne({_id: jobId, createdBy: userId})

    if(!job){
        throw new NotFoundError(`No job with id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({job})
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId //tieing this job to a user by their userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}
 
const updateJob = async (req, res) => {
    const{user:{userId}, params:{id:jobId}, body:{company,position,status}} = req

    let updateStack ={};
    if(!(company=== '')){
        updateStack.company = company
    }if(!(position=== '')){
        updateStack.position = position
    }if(status){
        updateStack.status = status
    }

    if(!(updateStack.company)|| !(updateStack.position)){
        throw new BadRequestError('company or position fields cannot be empty')
    }
    
    const job = await Job.findOneAndUpdate({_id:jobId, createdBy: userId}, updateStack, {new:true, runValidators:true})

    if(!job){
        throw new NotFoundError(`No job with id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({msg:'updated job',updatedJob:job});
}

const deleteJob = async (req, res) => {
    const {user:{userId}, params:{id:jobId}} = req

    const job = await Job.findByIdAndDelete({_id:jobId, createdBy:userId})

    if(!job){
        throw new NotFoundError(`No job with id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({msg:`Deleted job with id ${jobId}`});
}

module.exports = {getAllJobs, getJob, createJob, updateJob, deleteJob}