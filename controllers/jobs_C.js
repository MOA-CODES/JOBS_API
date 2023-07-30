const Job = require('../models/job_M')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({count: jobs.length, jobs})
}

const getJob = async (req, res) => {
    res.send('get job');
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId //tieing this job to a user by their userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async (req, res) => {
    res.send('update job');
}

const deleteJob = async (req, res) => {
    res.send('delete job');
}

module.exports = {getAllJobs, getJob, createJob, updateJob, deleteJob}