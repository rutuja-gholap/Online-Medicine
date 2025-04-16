const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    Email:{
        type:String,
        required:true,
        unique: true,
    
    }
})

const Register = mongoose.model("Register",RegisterSchema)
module.exports = Register;