const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const Stripe = require('stripe');
const stripe = Stripe('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');

exports.createPaymentIntent = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { amount } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });

      res.status(200).send(paymentIntent.client_secret);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});