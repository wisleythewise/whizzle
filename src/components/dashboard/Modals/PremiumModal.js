import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { IdealBankElement } from '@stripe/react-stripe-js';
import {UserContext} from '../../CTX/UserContext';


const stripePromise = loadStripe('pk_live_51N98cKGPQQoxzNCweIkgGRhedoNd6L3GW2SZgKyDbPXcJSFknxocBV6VRDzAE6IeY9ITFR5BSLysxSPHi5SqU4up00xIc1uzsU');

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentIntent } = await stripe.confirmIdealPayment(clientSecret, {
      payment_method: {
        ideal: elements.getElement(IdealBankElement),
        billing_details: {
          name: 'Discretion', // replace with your customer's name
        },
      },
      return_url: 'https://whizzle.ai', // replace with your return URL
    });

    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Payment successful:', paymentIntent);
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <IdealBankElement className="ideal-bank-element" />
      <button className="checkout-button" type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
};


const PremiumModal = ({ closeModal }) => {
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = React.useState(null);
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [show , setShow] = useState(false);

  useEffect(() => {
    setShow(true)
  }, [currentUser])

  const handleUpgrade = () => {
    fetch('https://us-central1-whistle-58417.cloudfunctions.net/createPaymentIntent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 100, // amount in cents
        metadata: {
          customer_id: currentUser.uid, // replace with your customer's ID
          // add more metadata fields as needed
        },
      }),
    })
      .then(response => response.text())
      .then(setClientSecret)
      .catch(console.error);
  };

  const uiModal = () => {
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
  }
  

  return (show ? uiModal() : <div>Loading...</div> )
};

export default PremiumModal;
