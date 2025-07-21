import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Pencil, Plus, Settings, Trash2 } from 'lucide-react';
import axios from 'axios';

const columns = ["name", "email", "phone"];

const CustomerPage = () => {
  const navigate = useNavigate();
  const [customerDetail, setCustomerDetail] = useState([]);

  const fetchCustomerDetail = () => {
    axios.get('http://127.0.0.1:8000/api/customer/')
      .then(res => {
        const extendedData = res.data.map(item => ({ ...item, selected: false }));
        setCustomerDetail(extendedData);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchCustomerDetail();
  }, []);

  const toggleSelect = (id) => {
    const updated = customerDetail.map(c =>
      c.id === id ? { ...c, selected: !c.selected } : c
    );
    setCustomerDetail(updated);
  };

  const toggleSelectAll = (checked) => {
    const updated = customerDetail.map(c => ({ ...c, selected: checked }));
    setCustomerDetail(updated);
  };

  const handleDelete = () => {
    const toDelete = customerDetail.filter(c => c.selected);

    if (toDelete.length === 0) return alert("No customer selected");

    if (window.confirm(`Delete ${toDelete.length} selected customer(s)?`)) {
      Promise.all(
        toDelete.map(c =>
          axios.delete(`http://127.0.0.1:8000/api/customer/delete/${c.id}/`)
        )
      )
        .then(() => fetchCustomerDetail())
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold mb-4">Customers Table</h2>
        <button onClick={() => navigate('/customerform')} className='flex items-center gap-2 text-sm font-semibold bg-black/90 text-white p-2 rounded-lg cursor-pointer hover:bg-black/85'><Plus className='h-4 w-4' /> Add</button>
      </div>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 border-y border-gray-300">
              <input
                type="checkbox"
                checked={customerDetail.length > 0 && customerDetail.every(c => c.selected)}
                onChange={(e) => toggleSelectAll(e.target.checked)}
              />
            </th>
            {columns.map((col, index) => (
              <th
                key={index}
                className="border-y border-gray-300 p-4 font-semibold text-left"
              >
                {col.replace('_', ' ')}
              </th>
            ))}
            <th className='p-4 border-y border-gray-300 text-right'><Settings className='h-4 w-5 inline-block'/></th>
          </tr>
        </thead>
        <tbody>
          {customerDetail.map(customer => (
            <tr key={customer.id}>
              <td className="px-4 py-4 border-y border-gray-300 text-center">
                <input
                  type="checkbox"
                  checked={customer.selected}
                  onChange={() => toggleSelect(customer.id)}
                />
              </td>
              {columns.map((col, index) => (
                <td
                  key={index}
                  className="border-y border-gray-300 p-4 text-sm"
                >
                  {customer[col]}
                </td>
              ))}
              <td className='p-4 border-y border-gray-300 text-right'><Pencil className='h-4 w-5 inline-block'/></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-2 py-2 rounded-md hover:bg-red-500 cursor-pointer mt-2 absolute right-4"
      >
        Delete
      </button>
    </div >
  );
};

export default CustomerPage;
