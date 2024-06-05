import React, { useState } from 'react';
import BookCard from './BookCard';

const BookSelection = ({ books, onConfirmSelection }) => {
  const [selectedBooks, setSelectedBooks] = useState([]);

  const handleSelectBook = (book) => {
    setSelectedBooks([...selectedBooks, book]);
  };

  const handleConfirmSelection = () => {
    onConfirmSelection(selectedBooks);
  };

  return (
    <div>
      <h2>Select Books to Buy</h2>
      <div className="book-list">
        {books.map(book => (
          <BookCard key={book.isbn} book={book} onSelectBook={handleSelectBook} />
        ))}
      </div>
      <button onClick={handleConfirmSelection}>Confirm Selection</button>
    </div>
  );
};

export default BookSelection;
