const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    // Get the base URL from the Netlify Environment Variable
    const imageBaseUrl = process.env.IMAGE_BASE_URL;
    
    // Extract the image ID from the query parameters
    const imageId = event.queryStringParameters.id;

    if (!imageId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Image ID is required.' }),
        };
    }

    // Construct the full image URL
    const imageUrl = `${imageBaseUrl}${imageId}.jpg`;

    try {
        const response = await fetch(imageUrl);

        // Handle cases where the image is not found (e.g., a 404 status)
        if (!response.ok) {
            console.warn(`Image not found for ID: ${imageId}, fetching default.`);
            
            // You can use a hardcoded default image's data URL here
            // This is a placeholder. Generate a base64 string for your preferred default image.
            const defaultImageUrl = 'data:image/jpeg;base64,...'; 

            // or fetch a default image and convert it to base64
            // Example for fetching a default image:
            // const defaultRes = await fetch('https://media.istockphoto.com/id/1352945762/vector/no-image-available-like-missing-picture.jpg?s=612x612&w=0&k=20&c=4X-znbt02a8EIdxwDFaxfmKvUhTnLvLMv1i1f3bToog=');
            // const defaultBuffer = await defaultRes.buffer();
            // const defaultDataUrl = `data:image/jpeg;base64,${defaultBuffer.toString('base64')}`;
            
            return {
                statusCode: 200,
                body: JSON.stringify({ dataUrl: defaultImageUrl }),
            };
        }

        // Get the image data as a buffer
        const buffer = await response.buffer();
        
        // Convert the buffer to a base64 string
        const base64Image = buffer.toString('base64');
        
        // Create the data URL
        const dataUrl = `data:image/jpeg;base64,${base64Image}`;

        return {
            statusCode: 200,
            body: JSON.stringify({ dataUrl }),
        };
    } catch (error) {
        console.error('Error fetching image:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch image.' }),
        };
    }
};
