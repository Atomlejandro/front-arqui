import axios from 'axios';

export const getBooks = () => axios.get('/api/books');

export const getBookById = (id) => axios.get(`/api/books/${id}`);

export const purchaseBook = (bookId, cardNumber) => axios.post(`/api/transactions/purchase/${bookId}`, { cardNumber });
