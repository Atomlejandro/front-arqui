import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import PurchaseForm from './components/PurchaseForm';
import UserForm from './components/UserForm';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books/:isbn" element={<BookDetail />} />
          <Route path="/books/:isbn/purchase" element={<PurchaseForm />} />
          <Route path="/users/:cardNumber" element={<UserForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
