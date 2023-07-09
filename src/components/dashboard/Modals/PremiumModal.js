import React from 'react';
import { useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_live_51N98cKGPQQoxzNCweIkgGRhedoNd6L3GW2SZgKyDbPXcJSFknxocBV6VRDzAE6IeY9ITFR5BSLysxSPHi5SqU4up00xIc1uzsU');

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Payment successful:', paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
};

const PremiumModal = ({ closeModal }) => {
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = React.useState(null);

  const handleUpgrade = () => {
    fetch('https://us-central1-whistle-58417.cloudfunctions.net/createPaymentIntent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 1000, // amount in cents
      }),
    })
      .then(response => response.text())
      .then(setClientSecret)
      .catch(console.error);
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Premium Feature</h2>
        <p>This is a premium feature. Please upgrade to access this feature.</p>
        <button className='change-password' onClick={handleUpgrade}>Upgrade</button>
        {clientSecret && (
          <Elements stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default PremiumModal;
