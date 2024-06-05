import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PurchaseForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const { isbn } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/books/purchase', {
        cardNumber,
        bookIds: [isbn],
      });
      alert('Purchase successful');
    } catch (error) {
      alert('Purchase failed: ' + (error.response?.data || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Purchase Book</h2>
      <input
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <button type="submit">Purchase</button>
    </form>
  );
};

export default PurchaseForm;
