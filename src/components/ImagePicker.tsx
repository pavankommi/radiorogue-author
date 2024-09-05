"use client";
import React, { ChangeEvent, useRef, useState } from 'react';

interface ImagePickerProps {
    selectedImage: string | null;
    imageSource: string;
    altText: string;
    imageDescription: string;
    setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
    setImageSource: React.Dispatch<React.SetStateAction<string>>;
    setAltText: React.Dispatch<React.SetStateAction<string>>;
    setImageDescription: React.Dispatch<React.SetStateAction<string>>;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
    selectedImage,
    imageSource,
    altText,
    imageDescription,
    setSelectedImage,
    setImageSource,
    setAltText,
    setImageDescription,
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploading(true);
            setError(null);

            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('http://localhost:3000/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Failed to upload image');
                }

                const data = await response.json();
                setSelectedImage(data.url); // Set the image URL
                setImageSource(data.url); // Set the image source to the uploaded URL
            } catch (error) {
                setError('Error uploading the image');
            } finally {
                setUploading(false);
            }
        }
    };

    const handleDeleteImage = () => {
        setSelectedImage(null);
        setImageSource('');
        setAltText('');
        setImageDescription('');
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear the file input value
        }
    };

    return (
        <div className="my-4">
            <label className="block text-lg font-medium text-black mb-3">
                Upload image
            </label>
            <div className="flex items-center space-x-4 mt-1">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                />
                {selectedImage && (
                    <button
                        onClick={handleDeleteImage}
                        className="text-sm text-white bg-red-500 rounded px-4 py-2 hover:bg-red-600"
                    >
                        Delete Image
                    </button>
                )}
            </div>
            {uploading && <p className="text-blue-500 mt-4">Uploading...</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {selectedImage && (
                <div className="mt-4">
                    <img
                        src={selectedImage}
                        alt={altText || 'Selected Image'}
                        className="max-w-full h-auto border border-gray-300 rounded-lg shadow-sm"
                    />
                    <div className="mt-4">
                        <label htmlFor="image-source" className="block text-lg font-medium text-black">Image Source:</label>
                        <input
                            type="text"
                            id="image-source"
                            value={imageSource}
                            onChange={(e) => setImageSource(e.target.value)}
                            placeholder="Enter image source URL"
                            className="mt-1 block w-full bg-transparent focus:outline-none sm:text-lg text-black py-2 px-3"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="alt-text" className="block text-lg font-medium text-black">Alt Text:</label>
                        <input
                            type="text"
                            id="alt-text"
                            value={altText}
                            onChange={(e) => setAltText(e.target.value)}
                            placeholder="Enter alt text for the image"
                            className="mt-1 block w-full bg-transparent focus:outline-none sm:text-lg text-black py-2 px-3"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="image-description" className="block text-lg font-medium text-black">Image Description:</label>
                        <textarea
                            id="image-description"
                            value={imageDescription}
                            onChange={(e) => setImageDescription(e.target.value)}
                            placeholder="Enter a description for the image"
                            rows={6}
                            className="mt-1 block w-full bg-transparent focus:outline-none sm:text-lg text-black py-2 px-3 h-28 resize-none"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImagePicker;
