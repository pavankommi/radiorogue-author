"use client";
import React, { useState } from 'react';

interface ShortSummaryInputProps {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}

const ShortSummaryInput: React.FC<ShortSummaryInputProps> = ({ label, placeholder, value, onChange }) => {
    const maxLength = 600;

    return (
        <div className="mt-4">
            <label className="block text-lg font-medium text-black">
                {label}
            </label>
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                maxLength={maxLength}
                className="mt-1 block w-full bg-transparent focus:outline-none sm:text-lg text-black py-2 px-3 h-28 resize-none"
            />
            <div className="text-right text-sm text-gray-500 mt-1">
                {value.length}/{maxLength} characters
            </div>
        </div>
    );
};

export default ShortSummaryInput;
