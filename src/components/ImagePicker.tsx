"use client";
import React, { ChangeEvent, useRef } from 'react';

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

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
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
        <div className="mt-4">
            <h2 className="text-2xl font-bold text-black mb-4">Image Picker</h2>
            <div className="flex items-center space-x-4">
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
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 sm:text-lg text-black py-2 px-3"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="alt-text" className="block text-lg font-medium text-black">Alt Text:</label>
                        <input
                            type="text"
                            id="alt-text"
                            value={altText}
                            onChange={(e) => setAltText(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 sm:text-lg text-black py-2 px-3"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="image-description" className="block text-lg font-medium text-black">Image Description:</label>
                        <textarea
                            id="image-description"
                            value={imageDescription}
                            onChange={(e) => setImageDescription(e.target.value)}
                            rows={6}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-violet-500 focus:border-violet-500 sm:text-lg text-black py-2 px-3"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImagePicker;
