import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import axios from 'axios';

const columns = ["name", "email", "phone"];

const CustomerPage = () => {

  const navigate = useNavigate();

  const [customerDetail, setCustomerDetail] = useState([])

  const fetchCustomerDetail = () => {
    axios.get('http://127.0.0.1:8000/api/customer/')
      .then(res => setCustomerDetail(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchCustomerDetail()
  }, [])

  const handleDelete = (customerId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this customer?')
    if (confirmDelete) {
      axios.delete(`http://127.0.0.1:8000/api/customer/delete/${customerId}/`)
        .then(() => fetchCustomerDetail())
        .catch(err => console.log(err));
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold mb-4">Customers Table</h2>
          <button onClick={() => navigate('/customerform')} className='flex items-center gap-2 text-sm font-semibold bg-black/90 text-white p-2 rounded-lg cursor-pointer hover:bg-black/85'><Plus className='h-4 w-4' /> Add</button>
        </div>
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-y border-gray-300 p-4 text-left">
                <input type="checkbox" />
              </th>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="border-y border-gray-200 p-4 font-semibold text-left"
                >
                  {col.replace('_', ' ')}
                </th>
              ))}
              <th className="border-y border-gray-300 p-4 font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customerDetail.map((lead, i) => (
              <tr key={i}>
                <td className="border-y border-gray-300 px-4 py-4">
                  <input type="checkbox" />
                </td>
                {columns.map((col, index) => (
                  <td
                    key={index}
                    className="border-y border-gray-300 px-4 py-4 text-sm"
                  >
                    {lead[col]}
                  </td>
                ))}
                <td className="border-y border-gray-300 px-4 py-4 text-sm">
                  <button
                    onClick={() => handleDelete(lead.id)}
                    className="hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 className='h-5 w-5' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default CustomerPage