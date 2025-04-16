const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
    MedicineName: {
        type: String,
        required: true,
    },
    Price:{
        type: String,
        required: true,
    },
    Quantity:{
        type: String,
        required: true,
    },
    Name:{
        type: String,
        required: true
    },
    PhoneNumber:{
        type: String,
        required: true
    },
    Address:{
        type: String,
        required: true
    }
})

const Orders = mongoose.model('Orders', OrdersSchema);
module.exports = Orders