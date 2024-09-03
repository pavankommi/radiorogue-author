"use client";
import React from 'react';

interface SourceInputProps {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}

const SourceInput: React.FC<SourceInputProps> = ({ label, placeholder, value, onChange }) => {
    return (
        <div className="mt-4">
            <label className="block text-lg font-medium text-black">
                {label}
            </label>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 sm:text-lg text-black py-2 px-3"
            />
        </div>
    );
};

export default SourceInput;
