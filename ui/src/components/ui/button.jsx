import React from 'react';

export const Button = ({ children, onClick, className, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-sm font-semibold bg-black/90 text-white p-2 rounded-lg cursor-pointer hover:bg-black/85 transition ${className || ''}`}

    >
      {children}
    </button>
  );
};

export default Button;