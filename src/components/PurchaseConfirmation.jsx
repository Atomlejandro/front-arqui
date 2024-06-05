import React, { useState } from 'react';

const PurchaseConfirmation = ({ selectedBooks, onConfirmPurchase, onCancel }) => {
  const [cardNumber, setCardNumber] = useState('');
  const totalPrice = selectedBooks.reduce((total, book) => total + book.price, 0);

  const handleConfirmPurchase = () => {
    onConfirmPurchase(cardNumber); // Asegúrate de pasar el cardNumber aquí
  };

  return (
    <div>
      <h2>Confirm Purchase</h2>
      <ul>
        {selectedBooks.map(book => (
          <li key={book.isbn}>
            {book.title} - ${book.price}
          </li>
        ))}
      </ul>
      <p>Total Price: ${totalPrice}</p>
      <input
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <button onClick={handleConfirmPurchase}>Confirm Purchase</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default PurchaseConfirmation;
