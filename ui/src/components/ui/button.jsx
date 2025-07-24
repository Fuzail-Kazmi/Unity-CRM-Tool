import { Plus } from 'lucide-react';
import React from 'react';

export const Button = ({ children, onClick, className, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center gap-2 text-sm font-semibold bg-black/90 text-white p-2 rounded-lg cursor-pointer hover:bg-black/85 transition ${className || ''}`}

    >
      <Plus className='h-4 w-4'/>
      {children}
    </button>
  );
};

export default Button;