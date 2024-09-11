// server/controllers/bookingController.js
exports.makeBooking = (req, res) => {
    const { user, pickupLocation, destination } = req.body;

    // Here you would save the booking details to the database
    // and perform other necessary logic

    res.json({
        msg: 'Booking confirmed',
        bookingDetails: {
            ambulanceNumber: 'AMB1234',
            driverName: 'John Doe',
            driverContact: '9876543210',
            ambulanceModel: 'Toyota Hiace',
            arrivalTime: '10 mins',
        },
    });
};
