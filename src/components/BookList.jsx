import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import BookFilter from './BookFilter';
import BookSelection from './BookSelection';
import PurchaseConfirmation from './PurchaseConfirmation';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, [filters, searchQuery, searchType]);

  const fetchBooks = async () => {
    let url = '/api/books';
    let params = {};

    if (filters.minPrice && filters.maxPrice) {
      params.minPrice = filters.minPrice;
      params.maxPrice = filters.maxPrice;
      url = '/api/books/price';
    } else if (filters.genre) {
      url = `/api/books/genre/${filters.genre}`;
    } else if (filters.author) {
      url = `/api/books/author/${filters.author}`;
    } else if (filters.startDate && filters.endDate) {
      params.startDate = filters.startDate;
      params.endDate = filters.endDate;
      url = '/api/books/publishedDate';
    } else if (searchQuery) {
      if (searchType === 'title') {
        url = `/api/books/title/${searchQuery}`;
      } else if (searchType === 'isbn') {
        url = `/api/books/isbn/${searchQuery}`;
      }
    }

    const response = await axios.get(url, { params });
    setFilteredBooks(response.data);
  };

  const handleFilter = (filters) => {
    setFilters(filters);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
  };

  const handleConfirmSelection = (books) => {
    setSelectedBooks(books);
    setShowConfirmation(true);
  };

  const handleConfirmPurchase = async (cardNumber) => {
    try {
      const bookIds = selectedBooks.map(book => book.id);
      console.log('Book IDs:', bookIds);
      console.log('Card Number:', cardNumber);

      const response = await axios.post('/api/books/purchase', bookIds, {
        params: { cardNumber },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      alert('Purchase successful');
      setSelectedBooks([]);
      setShowConfirmation(false);
    } catch (error) {
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        alert(`Purchase failed: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        console.error('Request data:', error.request);
        alert('Purchase failed: No response from server.');
      } else {
        console.error('Error message:', error.message);
        alert(`Purchase failed: ${error.message}`);
      }
    }
  };

  const handleCancelPurchase = () => {
    setShowConfirmation(false);
    setSelectedBooks([]);
  };

  return (
    <div>
      <h1>Book List</h1>
      <SearchBar onSearch={handleSearch} onSearchTypeChange={handleSearchTypeChange} />
      <BookFilter onFilter={handleFilter} />
      {showConfirmation ? (
        <PurchaseConfirmation
          selectedBooks={selectedBooks}
          onConfirmPurchase={handleConfirmPurchase}
          onCancel={handleCancelPurchase}
        />
      ) : (
        <BookSelection books={filteredBooks} onConfirmSelection={handleConfirmSelection} />
      )}
    </div>
  );
};

export default BookList;
