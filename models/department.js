const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    }
})

module.exports = mongoose.model('departments', departmentSchema);