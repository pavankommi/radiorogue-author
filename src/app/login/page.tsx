"use client";
import React, { useState } from 'react';
import HeadingInput from '@/components/HeadingInput';
import ImagePicker from '@/components/ImagePicker';
import LinksInput from '@/components/LinksInput';
import ShortSummaryInput from '@/components/ShortSummaryInput';
import SourceInput from '@/components/SourceInput';
import dynamic from 'next/dynamic';
import { EditorState } from 'draft-js';

// Dynamically import the DraftEditor component
const EditorNoSSR = dynamic(() => import('../../components/DraftEditor'), {
    ssr: false,
    loading: () => <p>Loading...</p>, // Optional: A loading component
});

// Define the type for links
interface Link {
    url: string;
    text: string;
}

const AddPost = () => {
    // State for heading, short summary, source, and article author
    const [heading, setHeading] = useState<string>('');
    const [slug, setSlug] = useState<string>(''); // Assuming you need to handle slug separately
    const [shortSummary, setShortSummary] = useState<string>('');
    const [articleAuthor, setArticleAuthor] = useState<string>('');
    const [source, setSource] = useState<string>('');
    const [links, setLinks] = useState<Link[]>([]); // Updated type for links
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageSource, setImageSource] = useState<string>('');
    const [altText, setAltText] = useState<string>('');
    const [imageDescription, setImageDescription] = useState<string>('');
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [status, setStatus] = useState<'published' | 'draft'>('draft');
    const [categories, setCategories] = useState<string[]>([]);
    const [postedBy, setPostedBy] = useState<string>('');

    // Handler for category selection
    const handleCategoryChange = (selectedCategories: string[]) => {
        if (selectedCategories.length <= 3) {
            setCategories(selectedCategories);
        } else {
            alert("You can only select up to 3 categories.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-black">Write Post</h1>

            {/* Heading Input */}
            <HeadingInput
                label="Blog Heading"
                placeholder="Enter your blog heading"
                value={heading}
                onChange={setHeading}
            />

            {/* Slug Input */}
            <HeadingInput
                label="Slug"
                placeholder="Enter a URL-friendly slug"
                value={slug}
                onChange={setSlug}
            />

            {/* Short Summary Input */}
            <ShortSummaryInput
                label="Short Summary"
                placeholder="Enter a brief summary of your blog post"
                value={shortSummary}
                onChange={setShortSummary}
            />

            {/* Article Author Input */}
            <HeadingInput
                label="Article Author"
                placeholder="Enter the author name"
                value={articleAuthor}
                onChange={setArticleAuthor}
            />

            {/* Image Picker */}
            <ImagePicker
                selectedImage={selectedImage}
                imageSource={imageSource}
                altText={altText}
                imageDescription={imageDescription}
                setSelectedImage={setSelectedImage}
                setImageSource={setImageSource}
                setAltText={setAltText}
                setImageDescription={setImageDescription}
            />

            {/* Editor */}
            {/* <EditorNoSSR
                editorState={editorState}
                setEditorState={setEditorState}
            /> */}

            {/* Source Input */}
            <SourceInput
                label="Source"
                placeholder="Enter the source of your information"
                value={source}
                onChange={setSource}
            />

            {/* Links Input */}
            <LinksInput
                links={links}
                setLinks={setLinks}
            />

            {/* Categories Selector */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Categories</label>
                <select
                    multiple
                    value={categories}
                    onChange={(e) => handleCategoryChange(Array.from(e.target.selectedOptions, option => option.value))}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
                >
                    <option value="showbiz">Showbiz</option>
                    <option value="sport">Sport</option>
                    <option value="whats-hot">What's Hot</option>
                    <option value="rogues-pick">Rogue's Pick</option>
                </select>
                <p className="text-sm text-gray-500">Select up to 3 categories.</p>
            </div>

            {/* Status Selector */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm"
                >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
            </div>

            {/* Posted By Input */}
            <HeadingInput
                label="Posted By"
                placeholder="Enter the name of the person who posted the blog"
                value={postedBy}
                onChange={setPostedBy}
            />
        </div>
    );
};

export default AddPost;
