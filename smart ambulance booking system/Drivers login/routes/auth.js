const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Driver = require('../models/Driver');
require('dotenv').config();

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
    const { name, email, password, vehicleNumber, licenceNo } = req.body;

    try {
        // Check if the email is already registered
        let driver = await Driver.findOne({ email });
        if (driver) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Create a new driver
        driver = new Driver({
            name,
            email,
            password,
            vehicleNumber,
            licenceNo
        });

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        driver.password = await bcrypt.hash(password, salt);

        // Save the driver
        await driver.save();

        // Create and return JWT token
        const payload = { driverId: driver.id };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the driver by email
        let driver = await Driver.findOne({ email });
        if (!driver) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, driver.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create and return JWT token
        const payload = { driverId: driver.id };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
