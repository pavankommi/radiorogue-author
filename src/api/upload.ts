export const uploadImage = async (compressedFile: File) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    const formData = new FormData();
    formData.append('file', compressedFile);

    try {
        const response = await fetch(`${apiUrl}/api/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }

        const data = await response.json();
        return { success: true, url: data.url };
    } catch (error) {
        return { success: false, error: 'Error uploading the image' };
    }
};
