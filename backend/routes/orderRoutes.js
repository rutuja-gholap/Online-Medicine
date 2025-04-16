const express = require('express');
const Orders = require('../models/Order');

const router = express.Router();

router.post('/',async(req,res) => {
    try{
        const {MedicineName,Price, Quantity,Name, PhoneNumber,Address} = req.body;

        const orders = new Orders({
            MedicineName,
            Price,
            Quantity,
            Name,
            PhoneNumber,
            Address
        })
        await orders.save();
        res.status(201).json(orders);
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

router.get('/', async(req,res) => {
    try{
        const orders = await Orders.find();
        res.status(200).json(orders);
    } catch (err){
        res.status(500).send('Server error');
    }
})


module.exports = router