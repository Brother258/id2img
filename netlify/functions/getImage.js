// netlify/functions/getImage.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Get the base URL from the environment variable
  const imageBaseUrl = process.env.IMAGE_BASE_URL;

  // Extract the image ID from the query parameters
  const imageId = event.queryStringParameters.id;

  if (!imageId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Image ID is required.' }),
    };
  }

  const imageUrl = `${imageBaseUrl}${imageId}.jpg`;

  try {
    const response = await fetch(imageUrl);

    // If the image request fails, return a default image or an error
    if (!response.ok) {
        // You can provide a base64 encoded default image here
        const defaultImage = 'data:image/jpeg;base64,...'; // Replace with your base64 encoded default image
        return {
            statusCode: 200,
            body: JSON.stringify({ dataUrl: defaultImage }),
        };
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString('base64');
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
