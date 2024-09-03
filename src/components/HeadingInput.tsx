"use client";
import React, { useState } from 'react';

interface HeadingInputProps {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}

const HeadingInput: React.FC<HeadingInputProps> = ({ label, placeholder, value, onChange }) => {
    const maxLength = 60;
    return (
        <div className="mt-4">
            <label className="block text-lg font-medium text-black">
                {label}
            </label>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                maxLength={60}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 sm:text-lg text-black py-2 px-3"
            />
            <div className="text-right text-sm text-gray-500 mt-1">
                {value.length}/{maxLength} characters
            </div>
        </div>
    );
};

export default HeadingInput;
