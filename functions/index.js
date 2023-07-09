const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const Stripe = require('stripe');
const stripe = Stripe(functions.config().stripe.secret);
const admin = require('firebase-admin');

admin.initializeApp();

exports.createPaymentIntent = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { amount, metadata } = req.body;

    try {

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'eur', // iDEAL can only be used with Euros
        payment_method_types: ['ideal'], // add this line
        metadata : metadata
      });


      res.status(200).send(paymentIntent.client_secret);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});


exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers['stripe-signature'],
        functions.config().stripe.webhook_secret
      );
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const { metadata } = paymentIntent;
  
      // Here you can update the user document in Firestore
      const db = admin.firestore();
      const userRef = db.collection('users').doc(metadata.customer_id);
  
      await userRef.update({
        premiumUser: true
      });
    }
  
    res.json({received: true});
  });