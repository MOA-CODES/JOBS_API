const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true, 'Please provide company name'],
        maxlength:50,
    },
    position:{
        type:String,
        required:[true, 'Please provide position'],
        maxlength:100,
    },
    status:{
        type:String,
        enum:['interview', 'declined','pending'],
        default: 'pending',
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',//the model were referencing
        required:[true, 'Please provide a user']
    }
},{timestamps:true})

module.exports = mongoose.model('Job', jobSchema)