"use client";
import React, { useState } from 'react';
import HeadingInput from '@/components/HeadingInput';
import ImagePicker from '@/components/ImagePicker';
import LinksInput from '@/components/LinksInput';
import ShortSummaryInput from '@/components/ShortSummaryInput';
import SourceInput from '@/components/SourceInput';
import dynamic from 'next/dynamic';
import { Link } from '../../types/types';
import { toast, Toaster } from 'react-hot-toast';
import PostedByInput from '@/components/PostedByInput';
import CategoriesCheckboxes from '@/components/CategoriesCheckboxes';
import StatusRadioGroup from '@/components/StatusRadioGroup';
import { createBlogPost } from '@/api/blog';

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
    const [editorContent, setEditorContent] = useState<string>('');
    const [status, setStatus] = useState<'published' | 'draft'>('draft');
    const [categories, setCategories] = useState<string[]>([]);
    const [postedBy, setPostedBy] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const resetForm = () => {
        setHeading('');
        setShortSummary('');
        setArticleAuthor('');
        setSource('');
        setLinks([]);
        setSelectedImage(null);
        setImageSource('');
        setAltText('');
        setImageDescription('');
        setEditorContent('');
        setStatus('draft');
        setCategories([]);
        setPostedBy('');
    };

    const handleCategoryChange = (selectedCategories: string[]) => {
        if (selectedCategories.length <= 3) {
            setCategories(selectedCategories);
        } else {
            toast.error("You can only select up to 3 categories.");
        }
    };

    const handlePostBlog = async () => {
        if (!heading || !shortSummary || !articleAuthor || !editorContent) {
            toast.error('Please fill in all required fields.');
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

        const result = await createBlogPost(blogPost);

        if (result.success) {
            toast.success('Blog post saved successfully!');
            resetForm();
        } else {
            toast.error(`Failed to save blog post: ${result.error || 'Unknown error'}`);
        }

    };

    const generateSlug = (heading: string) => {
        return heading.toLowerCase().replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    };

    return (
        <div className="container mx-auto p-4 bg-white rounded max-w-3xl mt-16">
            <Toaster />
            <h1 className="text-2xl font-semibold mb-4 text-center text-gray-700">New Blog Post</h1>

            <div className="space-y-3">
                <HeadingInput
                    label="Heading"
                    placeholder="Blog heading"
                    value={heading}
                    onChange={setHeading}
                />

                <HeadingInput
                    label="Slug"
                    placeholder="Auto-generated slug"
                    value={generateSlug(heading)}
                    onChange={() => { }}
                />

                <ShortSummaryInput
                    label="Summary"
                    placeholder="Brief summary"
                    value={shortSummary}
                    onChange={setShortSummary}
                />

                <HeadingInput
                    label="Author"
                    placeholder="Author name"
                    value={articleAuthor}
                    onChange={setArticleAuthor}
                />

                <PostedByInput
                    label="Posted By"
                    placeholder="Enter your name"
                    value={postedBy}
                    onChange={setPostedBy}
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
                    placeholder="Information source"
                    value={source}
                    onChange={setSource}
                />

                <LinksInput
                    links={links}
                    setLinks={setLinks}
                />

                <CategoriesCheckboxes
                    categories={categories}
                    handleCategoryChange={handleCategoryChange}
                />

                <StatusRadioGroup
                    status={status}
                    setStatus={setStatus}
                />

                <div className='mt-24'>
                    <button
                        onClick={handlePostBlog}
                        className="mt-4 w-full bg-red-500 text-white font-medium py-2 rounded hover:bg-red-600 transition"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Posting...' : 'Post Blog'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AddPost;
