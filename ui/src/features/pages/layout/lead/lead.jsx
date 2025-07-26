import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button'
import axios from 'axios';

import { formatDistanceToNow } from 'date-fns';

const Toolbar = React.lazy(() => import('@/components/ui/tool_bar'))
const LeadActions = React.lazy(() => import('@/components/ui/leadRowToolbar'))
const LeadForm = React.lazy(() => import('./lead_form'))

const columns = ["name", "email", "mobile", "source"];

const LeadPage = () => {
  const navigate = useNavigate();
  const [lead, setLead] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  const getTimeAgo = (dateString) => {
    if (!dateString) return 'No update date';

    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate)) return 'Invalid date';

    return formatDistanceToNow(parsedDate, { addSuffix: true });
  };

  const handleDropdownToggle = (leadId) => {
    setActiveDropdownId(prev => (prev === leadId ? null : leadId));
  };

  const fetchLead = () => {
    axios.get(`http://127.0.0.1:8000/api/lead/?t=${Date.now()}`)
      .then(res => {
        const extendedData = res.data
          .sort((a, b) => b.id - a.id)
          .map(item => ({ ...item, selected: false }));
        setLead(extendedData);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchLead();
  }, []);

  const toggleSelect = (id) => {
    setLead({ ...lead });
    const updated = lead.map(c =>
      c.id === id ? { ...c, selected: !c.selected } : c
    );
    setLead(updated);
  };

  const toggleSelectAll = (checked) => {
    const updated = lead.map(c => ({ ...c, selected: checked }));
    setLead(updated);
  };

  const handleEdit = (lead) => {
    setEditData({ ...lead });
  };

  const inputField = ({ label, value, onChange }) => (
    <div>
      <label className="block text-xs text-gray-500 mb-1">{label}</label>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        placeholder={label}
      />
    </div>
  );

  const handleUpdateLead = async () => {
    try {
      console.log("Sending data to backend:", editData);
      await axios.put(
        `http://127.0.0.1:8000/api/lead/update/${editData.id}/`,
        editData
      );

      fetchLead();

      setEditData(null);

      alert("Lead updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update lead");
    }
  };

  const handleDelete = () => {
    const toDelete = lead.filter(c => c.selected);

    if (toDelete.length === 0) return alert("No lead selected");

    if (window.confirm(`Delete ${toDelete.length} selected lead(s)?`)) {
      Promise.all(
        toDelete.map(c =>
          axios.delete(`http://127.0.0.1:8000/api/lead/delete/${c.id}/`)
        )
      )
        .then(() => fetchLead())
        .catch(err => console.log(err));
    }
  };

  return (
    <>
      <div className='max-h-[96dvh] overflow-y-auto'>
        <div className="flex items-center justify-between border-b border-gray-300 pb-2">
          <h2 className="text-lg font-semibold text-gray-500">Leads</h2>
          <div className='flex items-center gap-2'>
            <button
              onClick={handleDelete}
              className="text-sm font-semibold bg-gray-200 text-gray-800 py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-200/75"
            >
              Delete
            </button>
            <Button onClick={() => setShowAddForm(true)} size='sm'>Add</Button>
          </div>
        </div>

        <div>
          <Toolbar />
        </div>
        <div className='max-h-[80vh] h-[80vh] overflow-y-auto'>
          <table className="w-full border border-gray-200 rounded-md">
            <thead className="bg-gray-200">
              <tr className="text-xs text-gray-500 uppercase">
                <th className="px-3 py-2 text-left">
                  <input
                    type="checkbox"
                    checked={lead.length > 0 && lead.every(c => c.selected)}
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                    className='cursor-pointer'
                  />
                </th>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className="px-3 py-2 font-medium text-left whitespace-nowrap"
                  >
                    {col.replace('_', ' ')}
                  </th>
                ))}
                <th className="px-3 py-2 font-medium text-left whitespace-nowrap">
                  Last Updated
                </th>
                <th className="px-3 py-2 text-right">
                  <Settings className="h-4 w-4 inline-block text-gray-500" />
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {lead.map((lead, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-200 hover:bg-gray-200/25 transition cursor-pointer"
                  onClick={() => navigate(`/lead/${lead.id}`)}
                >
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={lead.selected}
                      onChange={() => toggleSelect(lead.id)}
                      className='cursor-pointer'
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  {columns.map((col, index) => (
                    <td
                      key={index}
                      className="px-3 py-3 whitespace-nowrap"
                    >
                      {lead[col]}
                    </td>
                  ))}

                  <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-500">
                    {getTimeAgo(lead.last_updated)}
                  </td>
                  <td onClick={(e) => e.stopPropagation()} className="px-3 py-3 text-right">
                    <LeadActions
                      lead={lead}
                      isOpen={activeDropdownId === lead.id}
                      onToggle={() => handleDropdownToggle(lead.id)}
                      onEdit={handleEdit}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {editData && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 md:p-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Edit Lead #{editData.id}
                </h2>
                <button
                  onClick={() => setEditData(null)}
                  className="text-gray-500 hover:text-gray-600 cursor-pointer"
                >
                  <X />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Salutation</label>
                    <select
                      value={editData.salutation || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, salutation: e.target.value })
                      }
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

                  {inputField({
                    label: "Full Name",
                    value: editData.name,
                    onChange: (val) => setEditData({ ...editData, name: val }),
                  })}

                  {inputField({
                    label: "Mobile No",
                    value: editData.mobile,
                    onChange: (val) => setEditData({ ...editData, mobile: val }),
                  })}
                </div>

                <div>
                  {inputField({
                    label: "Email",
                    value: editData.email,
                    onChange: (val) => setEditData({ ...editData, email: val }),
                  })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {inputField({
                    label: "Organization",
                    value: editData.organization,
                    onChange: (val) => setEditData({ ...editData, organization: val }),
                  })}

                  {inputField({
                    label: "No. of Employees",
                    value: editData.no_of_employee,
                    onChange: (val) =>
                      setEditData({ ...editData, no_of_employee: val }),
                  })}

                  {inputField({
                    label: "Annual Revenue",
                    value: editData.annual_revenue,
                    onChange: (val) =>
                      setEditData({ ...editData, annual_revenue: val }),
                  })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inputField({
                    label: "Website",
                    value: editData.source,
                    onChange: (val) => setEditData({ ...editData, source: val }),
                  })}

                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Industry</label>
                    <input
                      type="text"
                      placeholder="Industry"
                      disabled
                      className="w-full rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Status</label>
                    <select
                      value={editData.status || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, status: e.target.value })
                      }
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

                <div className="flex justify-end">
                  <button
                    onClick={handleUpdateLead}
                    className="bg-gray-900 text-white text-sm font-medium rounded-md px-4 py-2 hover:bg-gray-800 transition cursor-pointer"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showAddForm && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 md:p-8 relative">
              <div className='flex justify-between items-center mb-4'>
                <h2 className="text-lg font-semibold text-gray-800">Add New Lead</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className=" text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className='h-5 w-5' />
                </button>
              </div>
              <LeadForm onSuccess={() => {
                fetchLead();
                setShowAddForm(false);
              }} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LeadPage;

