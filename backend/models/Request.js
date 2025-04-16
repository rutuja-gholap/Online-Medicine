const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    PhoneNumber:{
        type: String,
        required: true,
    },
    Email:{
        type: String,
        required: true,
    },
    Medicine:{
        type: String,
        required: true
    },
    Message:{
        type: String,
        required: true
    }
})

const Request = mongoose.model('Request', RequestSchema);
module.exports = Request