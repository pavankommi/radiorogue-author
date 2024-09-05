"use client";
import React from 'react';

interface CategoriesCheckboxesProps {
    categories: string[];
    handleCategoryChange: (selectedCategories: string[]) => void;
}

const CategoriesCheckboxes: React.FC<CategoriesCheckboxesProps> = ({ categories, handleCategoryChange }) => {

    const toggleCategory = (category: string) => {
        if (categories.includes(category)) {
            handleCategoryChange(categories.filter(c => c !== category)); // Uncheck
        } else if (categories.length < 3) {
            handleCategoryChange([...categories, category]); // Check
        } else {
            alert('You can select up to 3 categories.');
        }
    };

    return (
        <div className="mt-4">
            <label className="block text-lg font-medium text-black mb-3">Choose categories</label>
            <div className="space-y-2">
                {['whats-hot', 'rogues-pick', 'tech-pulse', 'money-moves', 'sport', 'style-code'].map(category => (
                    <div key={category} className="flex items-center">
                        <input
                            type="checkbox"
                            id={category}
                            checked={categories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={category} className="ml-2 block text-sm text-gray-700 capitalize">
                            {category.replace('-', ' ')}
                        </label>
                    </div>
                ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">Select up to 3 categories.</p>
        </div>
    );
};

export default CategoriesCheckboxes;
