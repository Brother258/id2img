exports.handler = async function(event, context) {
  const imageBaseUrl = process.env.IMAGE_BASE_URL;
  const imageId = event.queryStringParameters?.id;

  if (!imageId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Image ID is required.' }),
    };
  }

  const imageUrl = `${imageBaseUrl}${imageId}.jpg`;

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      // Base64 placeholder image (you should replace this with actual base64)
      const defaultImage = 'data:image/jpeg;base64,...';
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
