import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerForm = () => {
  const [customerDetail, setCustomerDetail] = useState({
    name: '',
    email: '',
    phone: '',
  })
  
  const [message,setMessage] = useState('')

  const handleChange = (e) => {
    setCustomerDetail({
      ...customerDetail,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/customer/create/', customerDetail)
      setMessage('Customer created successfully!')
      setCustomerDetail({name:'',email:'',phone:''})
    } catch (err) {
      console.log(err)
      setMessage('Failed to create customer')
    }
  }
  
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-3xl space-y-4"
      >
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">Create New Customer</h2>
        {message && <p className="text-sm text-green-600 font-medium">{message}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              onChange={handleChange}
              value={customerDetail.name}
              name="name"
              placeholder="Enter full name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              onChange={handleChange}
              value={customerDetail.email}
              name="email"
              placeholder="Enter email address"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone</label>
            <input
              type="text"
              onChange={handleChange}
              value={customerDetail.phone}
              name="phone"
              placeholder="Enter phone number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Submit Lead
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
