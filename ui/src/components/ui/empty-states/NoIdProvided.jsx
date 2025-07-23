import React from 'react'
import { AlertTriangle } from 'lucide-react';

const NoIdProvided = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-6 rounded-2xl text-center max-w-md">
                <div className="flex justify-center mb-4 text-yellow-500">
                    <AlertTriangle size={48} />
                </div>
                <h2 className="text-xl font-semibold mb-2">ID Missing</h2>
                <p className="text-gray-600">
                    The lead ID is missing in the URL. <br />
                    Please go back and select a valid lead to view its details.
                </p>
            </div>
        </div>
    )
}

export default NoIdProvided