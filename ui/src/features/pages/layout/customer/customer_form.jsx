import React, { useState } from 'react';
import axios from 'axios';

const CustomerForm = ({ onSuccess }) => {
  const [customerDetail, setCustomerDetail] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setCustomerDetail({
      ...customerDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/customer/create/', customerDetail);
      setMessage('Customer created successfully!');
      setCustomerDetail({ name: '', email: '', phone: '' });
      onSuccess();
    } catch (err) {
      console.log(err);
      setMessage('Failed to create customer');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <p
          className={`text-sm font-medium ${message.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}
        >
          {message}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={customerDetail.name}
            onChange={handleChange}
            placeholder="Enter full name"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={customerDetail.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={customerDetail.phone}
            onChange={handleChange}
            placeholder="Enter phone"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-gray-900 text-white text-sm font-medium rounded-md px-4 py-2 hover:bg-gray-800 transition cursor-pointer"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
