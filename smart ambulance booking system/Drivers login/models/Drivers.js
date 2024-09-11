const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    licenceNo: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Driver', DriverSchema);
