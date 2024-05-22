// routes/payment.js

const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Transaction = require('../models/Transaction');

// Create checkout session
router.post('/create-checkout-session', async (req, res) => {
    const { name, amount } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Payment',
                    },
                    unit_amount: amount * 100, // Stripe requires amount in cents
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        // Save transaction data to MongoDB
        const transaction = new Transaction({
            name,
            amount,
            transactionID: session.id
        });
        await transaction.save();

        res.json({ url: session.url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating checkout session' });
    }
});

module.exports = router;
