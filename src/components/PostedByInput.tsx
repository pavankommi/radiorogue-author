"use client";
import React from 'react';

interface PostedByInputProps {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}

const PostedByInput: React.FC<PostedByInputProps> = ({ label, placeholder, value, onChange }) => {
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
                className="mt-1 block w-full bg-transparent focus:outline-none sm:text-lg text-black py-2 px-3"
            />
        </div>
    );
};

export default PostedByInput;
