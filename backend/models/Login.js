const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
    },
    Email:{
        type: String,
        required: true,
    },
    PhoneNumber:{
        type: String,
        required: true,
    },
    Password:{
        type: String,
        required: true
    }
})

const Login = mongoose.model('Login', LoginSchema);
module.exports = Login