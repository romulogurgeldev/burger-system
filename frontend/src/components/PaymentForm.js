import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = ({ order }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      return;
    }

    try {
      const response = await axios.post('/api/payments', {
        paymentMethodId: paymentMethod.id,
        orderId: order._id,
      });
      setSuccess(true);
      console.log('Payment successful:', response.data);
    } catch (error) {
      setError('Payment failed. Please try again.');
      console.error('Error processing payment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pagar</button>
      {error && <p>{error}</p>}
      {success && <p>Pagamento realizado com sucesso!</p>}
    </form>
  );
};

export default PaymentForm;
