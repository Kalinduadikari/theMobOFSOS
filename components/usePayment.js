import { useState } from 'react';
import axios from 'axios';

const usePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPaymentIntent = async (amount) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/api/payments/intents', { amount: Math.floor(amount.amount) });
      const clientSecret = response.data.paymentIntent;

      setIsLoading(false);
      return clientSecret;
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
      throw e;
    }
  };

  return { createPaymentIntent, isLoading, error };
};

export default usePayment;
