"use client";
import React from 'react';

interface Link {
    url: string;
    text: string;
}

interface LinksInputProps {
    links: Link[];
    setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
}

const LinksInput: React.FC<LinksInputProps> = ({ links, setLinks }) => {

    const handleLinkChange = (index: number, field: 'url' | 'text', value: string) => {
        const updatedLinks = [...links];
        updatedLinks[index] = { ...updatedLinks[index], [field]: value };
        setLinks(updatedLinks);
    };

    const handleAddLink = () => {
        setLinks([...links, { url: '', text: '' }]);
    };

    return (
        <div className="mt-4">
            <label className="block text-lg font-medium text-black">
                Links
            </label>
            {links.map((link, index) => (
                <div key={index} className="flex mb-2 space-x-2">
                    <input
                        type="text"
                        placeholder="Link URL"
                        value={link.url}
                        onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                        className="block w-1/2 bg-transparent focus:outline-none sm:text-lg text-black py-2 px-3"
                    />
                    <input
                        type="text"
                        placeholder="Link Text"
                        value={link.text}
                        onChange={(e) => handleLinkChange(index, 'text', e.target.value)}
                        className="block w-1/2 bg-transparent focus:outline-none sm:text-lg text-black py-2 px-3"
                    />
                </div>
            ))}
            <button
                type="button"
                onClick={handleAddLink}
                className="mt-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Add Link
            </button>
        </div>
    );
};

export default LinksInput;
