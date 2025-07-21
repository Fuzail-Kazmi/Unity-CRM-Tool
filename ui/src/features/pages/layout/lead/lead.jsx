import { Pencil, Plus, Settings } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toolbar from '../../../../components/ui/tool_bar';

const columns = ["name", "email", "phone", "source"];

const LeadPage = () => {
  const navigate = useNavigate();
  const [leadDetail, setLeadDetail] = useState([]);

  const fetchLeadDetail = () => {
    axios.get('http://127.0.0.1:8000/api/lead/')
      .then(res => {
        const extendedData = res.data.map(item => ({ ...item, selected: false }));
        setLeadDetail(extendedData);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchLeadDetail();
  }, []);

  const toggleSelect = (id) => {
    const updated = leadDetail.map(c =>
      c.id === id ? { ...c, selected: !c.selected } : c
    );
    setLeadDetail(updated);
  };

  const toggleSelectAll = (checked) => {
    const updated = leadDetail.map(c => ({ ...c, selected: checked }));
    setLeadDetail(updated);
  };

  const handleDelete = () => {
    const toDelete = leadDetail.filter(c => c.selected);

    if (toDelete.length === 0) return alert("No lead selected");

    if (window.confirm(`Delete ${toDelete.length} selected lead(s)?`)) {
      Promise.all(
        toDelete.map(c =>
          axios.delete(`http://127.0.0.1:8000/api/lead/delete/${c.id}/`)
        )
      )
        .then(() => fetchLeadDetail())
        .catch(err => console.log(err));
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between border-b border-gray-300 pb-2">
          <h2 className="text-lg font-semibold text-gray-500">Leads</h2>
          <div className='flex items-center gap-2'>
            <button
              onClick={handleDelete}
              className="text-sm font-semibold bg-gray-200 text-gray-800 py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-200/75"
            >
              Delete
            </button>
            <button
              onClick={() => navigate('/leadform')}
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
            <tr className="text-xs text-gray-500 uppercase">
              <th className="px-3 py-2 text-left">
                <input
                  type="checkbox"
                  checked={leadDetail.length > 0 && leadDetail.every(c => c.selected)}
                  onChange={(e) => toggleSelectAll(e.target.checked)}
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
              <th className="px-3 py-2 text-right">
                <Settings className="h-4 w-4 inline-block text-gray-500" />
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {leadDetail.map((lead, i) => (
              <tr
                key={i}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-3 py-3">
                  <input
                    type="checkbox"
                    checked={lead.selected}
                    onChange={() => toggleSelect(lead.id)}
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
                <td className="px-3 py-3 text-right">
                  <Pencil className="h-4 w-4 text-gray-500 inline-block" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </>
  );
};

export default LeadPage;
