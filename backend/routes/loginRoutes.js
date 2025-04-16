const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Login = require('../models/Login'); 
const router = express.Router();


const JWT_SECRET = 'your_jwt_secret_key';  

router.post('/register', async (req, res) => {
    try {
        const { Username, Email, PhoneNumber, Password } = req.body;
        const existingUser = await Login.findOne({ Email });

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        const newUser = new Login({
            Username,
            Email,
            PhoneNumber,
            Password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { Email, Password } = req.body;

        const user = await Login.findOne({ Email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id, Username: user.Username, Email: user.Email },
            JWT_SECRET,
            { expiresIn: '1h' }  
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/logout', (req, res) => {
    try {
        
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        req.user = decoded; 
        next();
    });
};


router.get('/profile', authenticateJWT, (req, res) => {
    res.status(200).json({ message: 'Access granted', user: req.user });
});

module.exports = router;
