const express = require('express');
const Request = require('../models/Request');

const router = express.Router();

router.post('/',async(req,res) => {
    try{
        const {Name, PhoneNumber, Email,Medicine,Message} = req.body;

        const request = new Request({
            Name,
            PhoneNumber,
            Email,
            Medicine,
            Message
        })
        await request.save();
        res.status(201).json(request);
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

router.get('/', async(req,res) => {
    try{
        const request = await Request.find();
        res.status(200).json(request);
    } catch (err){
        res.status(500).send('Server error');
    }
})


module.exports = router