import { EllipsisVertical, Eye, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const LeadActions = ({ lead, isOpen, onToggle, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [dropUp, setDropUp] = useState(false);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < 120 && spaceAbove > 120) {
        setDropUp(true);
      } else {
        setDropUp(false);
      }
    }
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <EllipsisVertical
        className="h-4 w-4 text-gray-500 cursor-pointer"
        onClick={onToggle}
      />

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white z-10 cursor-pointer ${
            dropUp ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          <div className="py-1 text-sm text-gray-700">
            <button
              onClick={() => {
                onToggle();
                navigate(`/lead/${lead.id}`);
              }}
              className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </button>
            <button
              onClick={() => {
                onToggle();
                onEdit(lead);
              }}
              className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </button>
            <button
              onClick={() => {
                onToggle();
                onDelete(lead);
              }}
              className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadActions;
