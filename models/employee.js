const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    surname: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    address: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    },
    qualification: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    contactNumber: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    department: {
        type: ObjectId,
        ref: "Department"
    }
})

module.exports = mongoose.model('employees', employeeSchema);