import React from 'react';
import { RefreshCcw, ListFilter, ArrowUpDown, Columns2, Ellipsis } from 'lucide-react';

const Toolbar = () => {
  return (
    <div className='flex items-center justify-end py-4'>
      <div className="flex items-center gap-2 border-l border-gray-300 pl-3">
        <button className="bg-gray-200/75 hover:bg-gray-200 transition rounded-md text-gray-700 p-1.5 flex items-center justify-center cursor-pointer">
          <RefreshCcw className="h-4 w-4" />
        </button>
        <button className="bg-gray-200/75 hover:bg-gray-200 transition rounded-md text-gray-700 px-2 py-1.5 flex items-center gap-1.5 text-sm cursor-pointer">
          <ListFilter className="h-4 w-4" />
          Filter
        </button>
        <button className="bg-gray-200/75 hover:bg-gray-200 transition rounded-md text-gray-700 px-2 py-1.5 flex items-center gap-1.5 text-sm cursor-pointer">
          <ArrowUpDown className="h-4 w-4" />
          Sort
        </button>
        <button className="bg-gray-200/75 hover:bg-gray-200 transition rounded-md text-gray-700 px-2 py-1.5 flex items-center gap-1.5 text-sm cursor-pointer">
          <Columns2 className="h-4 w-4" />
          Columns
        </button>
        <button className="bg-gray-200/75 hover:bg-gray-200 transition rounded-md text-gray-700 p-1.5 flex items-center justify-center cursor-pointer">
          <Ellipsis className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;