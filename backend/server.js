
require('dotenv').config();
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' })); 

app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 4242;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
