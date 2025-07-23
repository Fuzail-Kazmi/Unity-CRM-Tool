import React, { useState, useEffect } from 'react';
import { Pencil, Plus, Settings, X } from 'lucide-react';
import axios from 'axios';
import CustomerForm from './customer_form';
import Toolbar from '@/components/ui/tool_bar';

const columns = ['name', 'email', 'mobile', 'created_at'];

const CustomerPage = () => {
  const [customerDetail, setCustomerDetail] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchCustomerDetail = () => {
    axios
      .get('http://127.0.0.1:8000/api/customer/')
      .then((res) => {
        const extendedData = res.data.map((item) => ({ ...item, selected: false }));
        setCustomerDetail(extendedData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCustomerDetail();
  }, []);

  const toggleSelect = (id) => {
    const updated = customerDetail.map((c) =>
      c.id === id ? { ...c, selected: !c.selected } : c
    );
    setCustomerDetail(updated);
  };

  const toggleSelectAll = (checked) => {
    const updated = customerDetail.map((c) => ({ ...c, selected: checked }));
    setCustomerDetail(updated);
  };

  const handleDelete = () => {
    const toDelete = customerDetail.filter((c) => c.selected);

    if (toDelete.length === 0) return alert('No customer selected');

    if (window.confirm(`Delete ${toDelete.length} selected customer(s)?`)) {
      Promise.all(
        toDelete.map((c) =>
          axios.delete(`http://127.0.0.1:8000/api/customer/delete/${c.id}/`)
        )
      )
        .then(() => fetchCustomerDetail())
        .catch((err) => console.log(err));
    }
  };

  const handleEdit = (customer) => {
    setEditData({ ...customer });
  };

  const inputField = ({ label, value, onChange }) => (
    <div>
      <label className="block text-xs text-gray-500 mb-1">{label}</label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={label}
      />
    </div>
  );

  const handleUpdateCustomer = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/customer/update/${editData.id}/`,
        editData
      );

      setCustomerDetail((prev) =>
        prev.map((cust) => (cust.id === editData.id ? { ...editData } : cust))
      );

      setEditData(null);
      alert('Customer updated successfully');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update customer');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b border-gray-300 pb-2">
        <h2 className="text-lg font-semibold text-gray-500">Customers</h2>
        <div className='flex items-center gap-2'>
          <button
            onClick={handleDelete}
            className="text-sm font-semibold bg-gray-200 text-gray-800 py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-200/75"
          >
            Delete
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 text-sm font-semibold bg-black/90 text-white p-2 rounded-lg cursor-pointer hover:bg-black/85"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>

      <div>
        <Toolbar />
      </div>

      <table className="w-full border border-gray-200 rounded-md overflow-hidden">
        <thead className="bg-gray-200">
          <tr className='text-xs text-gray-500 uppercase'>
            <th className="px-3 py-2 text-left">
              <input
                type="checkbox"
                checked={customerDetail.length > 0 && customerDetail.every((c) => c.selected)}
                onChange={(e) => toggleSelectAll(e.target.checked)}
                className='cursor-pointer'
              />
            </th>
            {columns.map((col, index) => (
              <th key={index} className="px-3 py-2 font-medium text-left whitespace-nowrap">
                {col.replace('_', ' ')}
              </th>
            ))}
            <th className="px-3 py-2 text-right">
              <Settings className="h-4 w-4 inline-block text-gray-500" />
            </th>
          </tr>
        </thead>
        <tbody className='text-sm text-gray-700'>
          {customerDetail.map((customer) => (
            <tr key={customer.id} className='border-t border-gray-200 hover:bg-gray-50 transition'>
              <td className="px-3 py-3">
                <input
                  type="checkbox"
                  checked={customer.selected}
                  onChange={() => toggleSelect(customer.id)}
                  className='cursor-pointer'
                />
              </td>
              {columns.map((col, index) => (
                <td key={index} className="px-3 py-3 whitespace-nowrap">
                  {customer[col]}
                </td>
              ))}
              <td className="px-3 py-3 text-right">
                <Pencil
                  className="h-4 w-4 text-gray-500 inline-block cursor-pointer"
                  onClick={() => handleEdit(customer)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editData && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Edit Customer #{editData.id}
              </h2>
              <button
                onClick={() => setEditData(null)}
                className="text-gray-500 hover:text-gray-600 cursor-pointer"
              >
                <X />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {inputField({
                  label: 'Full Name',
                  value: editData.name,
                  onChange: (val) => setEditData({ ...editData, name: val }),
                })}
                {inputField({
                  label: 'Email',
                  value: editData.email,
                  onChange: (val) => setEditData({ ...editData, email: val }),
                })}
                {inputField({
                  label: 'Phone',
                  value: editData.phone,
                  onChange: (val) => setEditData({ ...editData, phone: val }),
                })}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleUpdateCustomer}
                className="bg-gray-900 text-white text-sm font-medium rounded-md px-4 py-2 hover:bg-gray-800 transition cursor-pointer"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 md:p-8 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Add New Customer</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <CustomerForm onSuccess={() => {
              setShowAddForm(false);
              fetchCustomerDetail();
            }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;
