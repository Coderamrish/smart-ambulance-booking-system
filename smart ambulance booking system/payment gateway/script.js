document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Hide the form and show the Razorpay button
    document.getElementById('payment-form').style.display = 'none';
    document.getElementById('razorpay-button-container').style.display = 'block';  

    document.getElementById('pay-now').addEventListener('click', function() {
        var options = {
            "key": "rzp_test_UKYkiYH5tcBIsD", // Enter the Key ID generated from the Dashboard
            "amount": "100", // Amount is in currency subunits. Default is INR. Hence, 100 refers to 100 paise
            "currency": "INR",
            "name": document.getElementById('name').value,
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "handler": function (response){
                alert('Payment Successful. Payment ID: ' + response.razorpay_payment_id);
            },
            "prefill": {
                "name": document.getElementById('name').value,
                "email": document.getElementById('email').value,
                "contact": document.getElementById('mobile').value
            },
            "notes": {
                "address": document.getElementById('address').value
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', function (response){
            alert('Payment Failed. Error: ' + response.error.description);
        });
        rzp1.open();
    });
});
