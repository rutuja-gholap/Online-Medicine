const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    MedicineName: {
        type: String,
        required: true,
    },
    Price:{
        type: String,
        required: true,
    },
    Image:{
        type: String,
        required: true
    }
})

const Medicine = mongoose.model('Medicine', MedicineSchema);
module.exports = Medicine