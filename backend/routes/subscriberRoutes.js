const Register = require("../models/Subscriber");
const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { Email } = req.body;
        const existingUser = await Register.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const register = new Register({ Email });
        await register.save();

        res.status(201).json(register);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/', async (req, res) => {
    try {
        const register = await Register.find();
        res.status(200).json(register);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
