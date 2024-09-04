"use client";
import React, { useState } from 'react';
import HeadingInput from '@/components/HeadingInput';
import ImagePicker from '@/components/ImagePicker';
import LinksInput from '@/components/LinksInput';
import ShortSummaryInput from '@/components/ShortSummaryInput';
import SourceInput from '@/components/SourceInput';
import dynamic from 'next/dynamic';
import { Link } from '../../types/types'; // Adjust the path if necessary

const TipTapEditor = dynamic(() => import('../../components/TipTapEditor'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

const AddPost = () => {
    const [heading, setHeading] = useState<string>('');
    const [shortSummary, setShortSummary] = useState<string>('');
    const [articleAuthor, setArticleAuthor] = useState<string>('');
    const [source, setSource] = useState<string>('');
    const [links, setLinks] = useState<Link[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageSource, setImageSource] = useState<string>('');
    const [altText, setAltText] = useState<string>('');
    const [imageDescription, setImageDescription] = useState<string>('');
    const [editorContent, setEditorContent] = useState<string>(''); // State to hold the editor content
    const [status, setStatus] = useState<'published' | 'draft'>('draft');
    const [categories, setCategories] = useState<string[]>([]);
    const [postedBy, setPostedBy] = useState<string>(''); //66d7b8466e7f3bddb2563867 mine
    const [isLoading, setIsLoading] = useState(false);

    // Handle category change and enforce the 3-category limit
    const handleCategoryChange = (selectedCategories: string[]) => {
        if (selectedCategories.length <= 3) {
            setCategories(selectedCategories);
        } else {
            alert("You can only select up to 3 categories.");
        }
    };

    // Prepare and send the blog post data
    const handlePostBlog = async () => {
        if (!heading || !shortSummary || !articleAuthor || !editorContent) {
            alert('Please fill in all required fields.');
            return;
        }

        if (!window.confirm('Are you sure you want to post this blog?')) {
            return;
        }

        setIsLoading(true);

        const blogPost = {
            heading,
            slug: heading ? generateSlug(heading) : '',
            shortSummary,
            articleAuthor,
            source,
            links,
            image: {
                url: selectedImage || '',
                altText,
                description: imageDescription,
                imageSrc: imageSource
            },
            content: editorContent,
            status,
            categories,
            postedBy,
        };

        console.log("Blog post data:", blogPost);

        try {
            const response = await fetch('http://localhost:3000/api/blog/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blogPost),
            });

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();

                if (response.ok) {
                    alert('Blog post saved successfully!');
                    // Additional actions can be added here
                } else {
                    alert(`Failed to save blog post: ${data.error || 'Unknown error'}`);
                }
            } else {
                console.error('Unexpected content type:', contentType);
                alert('Failed to save blog post: Unexpected response format');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while saving the blog post.');
        } finally {
            setIsLoading(false);
        }
    };


    // Function to generate a slug from heading (you might need to adjust it based on your needs)
    const generateSlug = (heading: string) => {
        return heading.toLowerCase().replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/[^\w\-]+/g, '') // Remove non-word characters
            .replace(/\-\-+/g, '-') // Replace multiple hyphens with a single hyphen
            .replace(/^-+/, '') // Remove leading hyphens
            .replace(/-+$/, ''); // Remove trailing hyphens
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-3xl"> {/* Increased width */}
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Write a New Blog Post</h1>

            <div className="space-y-4">
                <HeadingInput
                    label="Blog Heading"
                    placeholder="Enter your blog heading"
                    value={heading}
                    onChange={setHeading}
                />

                <HeadingInput
                    label="Slug"
                    placeholder="Enter a URL-friendly slug"
                    value={generateSlug(heading)} // Show generated slug
                    onChange={() => { }} // No-op function
                />

                <ShortSummaryInput
                    label="Short Summary"
                    placeholder="Enter a brief summary of your blog post"
                    value={shortSummary}
                    onChange={setShortSummary}
                />

                <HeadingInput
                    label="Article Author"
                    placeholder="Enter the author name"
                    value={articleAuthor}
                    onChange={setArticleAuthor}
                />

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

                <TipTapEditor
                    content={editorContent}
                    setContent={setEditorContent}
                />

                <SourceInput
                    label="Source"
                    placeholder="Enter the source of your information"
                    value={source}
                    onChange={setSource}
                />

                <LinksInput
                    links={links}
                    setLinks={setLinks}
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700">Categories</label>
                    <select
                        multiple
                        value={categories}
                        onChange={(e) => handleCategoryChange(Array.from(e.target.selectedOptions, option => option.value))}
                        className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="showbiz">Showbiz</option>
                        <option value="sport">Sport</option>
                        <option value="whats-hot">What's Hot</option>
                        <option value="rogues-pick">Rogue's Pick</option>
                    </select>
                    <p className="text-sm text-gray-500 mt-1">Select up to 3 categories.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                        className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Posted By</label>
                    <input
                        type="text"
                        value={postedBy}
                        onChange={(e) => setPostedBy(e.target.value)}
                        className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    onClick={handlePostBlog}
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Post Blog
                </button>
            </div>
        </div>
    );
};

export default AddPost;
