import React, { useState } from 'react';

const SampleRazorpay = ({ totalAmount, paymentLink, userDetails, addressDetails }) => {
    // Function to handle the payment initiation
    const handlePayment = () => {
        const options = {
            key: process.env.RAZORPAY_KEY_ID,  // Your Razorpay public key
            amount: totalAmount * 100, // Amount in paise (Razorpay expects amount in paise)
            currency: 'INR',
            order_id: paymentLink, // Razorpay order ID received from backend
            name: 'Your Store Name', // Store name (required for branding)
            description: 'Order Payment', // Description of the payment
            handler: function (response) {
                // Payment success callback, send payment details to backend for verification
                verifyPayment(response);
            },
            prefill: {
                name: userDetails.name,
                email: userDetails.email,
                contact: userDetails.phone,
            },
        };

        // Create Razorpay instance
        const razorpay = new window.Razorpay(options);

        // Open Razorpay's payment modal
        razorpay.open();
    };

    // Function to verify payment details on the backend
    const verifyPayment = (response) => {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

        // Send payment details to the backend for verification
        fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id,
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                alert('Payment successful!');
            } else {
                alert('Payment verification failed.');
            }
        })
        .catch((error) => {
            console.error('Payment verification error:', error);
        });
    };

    return (
        <div>
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default SampleRazorpay;