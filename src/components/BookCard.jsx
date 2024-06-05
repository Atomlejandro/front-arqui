import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book, onSelectBook }) => {
  return (
    <div className="book-card">
      <img src={book.imageUrl} alt={book.title} className="book-cover" />
      <h3>{book.title}</h3>
      <p>ISBN: {book.isbn}</p>
      <p>Price: ${book.price}</p>
      <button onClick={() => onSelectBook(book)}>Select Book</button>
      <Link to={`/books/${book.isbn}`} className="details-button">
        View Details
      </Link>
    </div>
  );
};

export default BookCard;
