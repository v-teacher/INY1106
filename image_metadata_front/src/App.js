import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [imageId, setImageId] = useState('');
  const [message, setMessage] = useState('');

  // Set your API Gateway URL here
  const API_URL = 'https://your-api-gateway-url.com';

  // Handle file upload
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Upload image to API
  const handleUpload = async () => {
    if (!image) {
      setMessage('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Image uploaded successfully!');
      setImageId(response.data.image_id); // Assuming the API returns image_id in the response
    } catch (error) {
      setMessage('Failed to upload image.');
      console.error(error);
    }
  };

  // Get image metadata from API
  const handleGetMetadata = async () => {
    try {
      const response = await axios.get(`${API_URL}/metadata/${imageId}`);
      setMetadata(response.data);
    } catch (error) {
      setMessage('Failed to fetch metadata.');
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Image Manager</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
      <br />
      {message && <p>{message}</p>}

      <input
        type="text"
        placeholder="Enter Image ID"
        value={imageId}
        onChange={(e) => setImageId(e.target.value)}
      />
      <button onClick={handleGetMetadata}>Get Image Metadata</button>

      {metadata && (
        <div>
          <h2>Metadata</h2>
          <pre>{JSON.stringify(metadata, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
