import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`/api/books/isbn/${isbn}`);
        console.log('Book details response:', response.data);
        setBook(response.data[0]);  // Asegúrate de que response.data sea un array y tomas el primer elemento
      } catch (error) {
        console.error('There was an error fetching the book details!', error);
      }
    };

    fetchBook();
  }, [isbn]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{book.title}</h2>
      <img src={book.imageUrl} alt={book.title} />
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Price: ${book.price}</p>
      <p>Published Date: {new Date(book.publishedDate).toLocaleDateString()}</p>
      <p>{book.description}</p>
    </div>
  );
};

export default BookDetail;
