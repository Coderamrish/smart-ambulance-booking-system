const express = require('express');
const app = express();
const faker = require('faker'); // You may need to install the 'faker' package

app.use(express.json());

// Example endpoint to get booking details with random data
app.post('/api/getBookingDetails', (req, res) => {
    const { patientName, age } = req.body;

    // Generate random data
    const bookingDetails = {
        ambulanceNumber: faker.random.alphaNumeric(6).toUpperCase(),
        driverName: faker.name.findName(),
        driverContact: faker.phone.phoneNumber(),
        ambulanceModel: faker.vehicle.model(),
        arrivalTime: `${Math.floor(Math.random() * 30) + 5} minutes` // Random time between 5 and 35 minutes
    };

    res.json({
        ...bookingDetails,
        patientName,
        age
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
