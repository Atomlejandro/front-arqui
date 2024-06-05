import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ user }) => {
  const [formData, setFormData] = useState({
    cardNumber: user.cardNumber,
    name: user.name,
    city: user.city,
    country: user.country,
    age: user.age,
    gender: user.gender,
    profession: user.profession,
    balance: user.balance,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/members/${formData.cardNumber}`, formData)
      .then(response => {
        alert('User updated successfully!');
      })
      .catch(error => {
        console.error('There was an error updating the user!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
      <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
      <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
      <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" />
      <input type="text" name="profession" value={formData.profession} onChange={handleChange} placeholder="Profession" />
      <input type="number" name="balance" value={formData.balance} onChange={handleChange} placeholder="Balance" />
      <button type="submit">Update User</button>
    </form>
  );
};

export default UserForm;
