const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: 'rzp_test_UKYkiYH5tcBIsD',  // Replace with your Razorpay Key ID
    key_secret: 'YOUR_KEY_SECRET'  // Replace with your Razorpay Key Secret
});

// Route to create an order
app.post('/create/order', async (req, res) => {
    const options = {
        amount: req.body.amount * 100,  // amount in smallest currency unit (paise)
        currency: "INR",
        receipt: "receipt#1"
    };
    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to verify payment
app.post('/verify', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const generated_signature = crypto.createHmac('sha256', 'YOUR_KEY_SECRET')
                                       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
                                       .digest('hex');
    if (generated_signature === razorpay_signature) {
        res.json({ status: 'success' });
    } else {
        res.json({ status: 'failure' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
