import { useState } from "react";
import { ChevronDown } from "lucide-react";
import axios from "axios";

const statusOptions = [
  { label: "New", color: "bg-gray-500" },
  { label: "Contacted", color: "bg-orange-500" },
  { label: "Nurture", color: "bg-blue-500" },
  { label: "Qualified", color: "bg-green-500" },
  { label: "Unqualified", color: "bg-red-500" },
  { label: "Junk", color: "bg-purple-500" },
];

const StatusDropdown = ({ leadId, currentStatus, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus || "New");

  const statusObj = statusOptions.find((s) => s.label === selectedStatus) || statusOptions[0];

  const handleStatusChange = async (status) => {
    setSelectedStatus(status.label);
    setIsOpen(false);
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/lead/?id=${id}`, {
        status: status.label
      });
      if (onStatusChange) {
        onStatusChange(status.label);
      }
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status. Please try again.");
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 text-sm font-semibold bg-gray-200 text-gray-800 py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-200/75"
      >
        <span className={`h-3 w-3 rounded-full ${statusObj.color}`}></span>
        {statusObj.label}
        <ChevronDown className="w-4 h-4 ml-1" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
          {statusOptions.map((status) => (
            <div
              key={status.label}
              onClick={() => handleStatusChange(status)}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700"
            >
              <span className={`h-3 w-3 rounded-full ${status.color}`}></span>
              {status.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;