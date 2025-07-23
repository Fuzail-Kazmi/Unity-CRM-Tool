import React from "react";

export const Card = ({ children, className }) => {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className || ''}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className }) => {
  return (
    <div className={`p-4 ${className || ''}`}>
      {children}
    </div>
  );
};

export default Card;