import React from 'react';

export const Separator = ({ className }) => {
  return (
    <div
      className={`w-full h-px bg-gray-200 dark:bg-gray-700 ${className || ''}`}
    />
  );
};

export default Separator;