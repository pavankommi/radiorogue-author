"use client";
import React from 'react';

interface StatusRadioGroupProps {
    status: 'published' | 'draft';
    setStatus: (status: 'published' | 'draft') => void;
}

const StatusRadioGroup: React.FC<StatusRadioGroupProps> = ({ status, setStatus }) => {
    return (
        <div className="mt-4">
            <label className="block text-lg font-medium text-black">Status</label>
            <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center">
                    <input
                        type="radio"
                        id="draft"
                        name="status"
                        value="draft"
                        checked={status === 'draft'}
                        onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="draft" className="ml-2 text-sm text-gray-700">Draft</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="radio"
                        id="published"
                        name="status"
                        value="published"
                        checked={status === 'published'}
                        onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="published" className="ml-2 text-sm text-gray-700">Published</label>
                </div>
            </div>
        </div>
    );
};

export default StatusRadioGroup;
