import { useState } from 'react';
import axios from 'axios';


function Post() {
  const api = import.meta.env.VITE_PUBLIC_API || 'http://localhost:4001';
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/post`, formData); 
      setMessage('Data successfully added!');
      setFormData({ title: '', content: '' }); 
      
    } catch (error) {
      setMessage('Failed to add data!');
      console.error('Error posting data:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white bg-opacity-25 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">post</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-medium mb-2">title:</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              className="w-full p-2 bg-transparent-input text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter name"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-medium mb-2">content:</label>
            <input 
              type="text" 
              name="content" 
              value={formData.content} 
              onChange={handleChange} 
              className="w-full p-2 bg-transparent-input text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-transparent-button hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
            Add Data
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center font-medium ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>

    </div>
  );
}

export default Post;
