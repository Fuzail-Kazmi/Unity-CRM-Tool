import React, { useState } from 'react';
import axios from 'axios';

const LeadForm = ({ onSuccess }) => {
  const [leadCreate, setLeadCreate] = useState({
    salutation: '',
    name: '',
    email: '',
    mobile: '',
    source: '',
    organization: '',
    no_of_employee: '',
    status: '',
    annual_revenue: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setLeadCreate({
      ...leadCreate,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizedData = {
      ...leadCreate,
      no_of_employee: leadCreate.no_of_employee === '' ? null : parseInt(leadCreate.no_of_employee),
      annual_revenue: leadCreate.annual_revenue === '' ? null : parseFloat(leadCreate.annual_revenue),
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/lead/create/", sanitizedData);
      console.log("Lead created:", response.data);
      setMessage('Lead created successfully!');

      if (onSuccess) {
        onSuccess();
      }

    } catch (err) {
      if (err.response) {
        console.log("Server response error:", err.response.data);
      } else {
        console.log("Error:", err.message);
        setMessage('Failed to create lead');
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white rounded-xl w-full max-w-3xl p-6">
        <h2 className="text-xl font-semibold mb-4">Create Lead</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Salutation</label>
              <select
                name="salutation"
                value={leadCreate.salutation}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Salutation</option>
                <option value="Dr">Dr</option>
                <option value="Madam">Madam</option>
                <option value="Master">Master</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Mx">Mx</option>
                <option value="Prof">Prof</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={leadCreate.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Mobile No</label>
              <input
                type="text"
                name="mobile"
                value={leadCreate.mobile}
                onChange={handleChange}
                placeholder="Mobile No"
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="border-b border-gray-300 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={leadCreate.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Organization</label>
              <input
                type="text"
                name="organization"
                value={leadCreate.organization}
                onChange={handleChange}
                placeholder="Organization"
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">No. of Employees</label>
              <input
                type="text"
                name="no_of_employee"
                value={leadCreate.no_of_employee}
                onChange={handleChange}
                placeholder="1-999"
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Annual Revenue</label>
              <input
                type="number"
                name="annual_revenue"
                value={leadCreate.annual_revenue}
                onChange={handleChange}
                placeholder="$ 0.00"
                step="0.01"
                max="999999999999999999.99"
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border-b border-gray-300 pb-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Website</label>
              <input
                type="text"
                name="source"
                value={leadCreate.source}
                onChange={handleChange}
                placeholder="Website"
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Industry</label>
              <input
                type="text"
                placeholder="Industry"
                className="w-full rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-400"
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Status</label>
              <select
                name="status"
                value={leadCreate.status}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm"
              >
                <option value="">Select Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Nurture">Nurture</option>
                <option value="Qualified">Qualified</option>
                <option value="Unqualified">Unqualified</option>
                <option value="Junk">Junk</option>
              </select>
            </div>
          </div>

          {message && (
            <p className={`text-sm font-medium ${message.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gray-900 text-white text-sm font-medium rounded-md px-4 py-2 hover:bg-gray-800 transition cursor-pointer"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
