const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Transaction = require('../models/Transaction');

exports.processPayment = async (req, res) => {
    const { name, amount } = req.body;
    try {
        // Create Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'usd',
            description: 'Payment for services',
        });
        // Save transaction details to database
        const transaction = new Transaction({
            name,
            amount,
            transactionID: paymentIntent.id
        });
        await transaction.save();
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
