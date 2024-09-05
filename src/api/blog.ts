export const createBlogPost = async (blogPost: any) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    try {
        const response = await fetch(`${apiUrl}/api/blog/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blogPost),
        });

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            return { success: response.ok, data };
        } else {
            return { success: false, error: 'Unexpected response format' };
        }
    } catch (error) {
        return { success: false, error: 'An error occurred while saving the blog post.' };
    }
};
