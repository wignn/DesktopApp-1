import { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const api = import.meta.env.VITE_PUBLIC_API || 'http://localhost:4001';
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/login`, formData);
      console.log(response.data)
      if(response.data.token){
        localStorage.setItem('token', response.data.token)
        window.location.href='/'
      }
      setMessage('Login successful!');
      setFormData({ email: '', password: '' });
    } catch (error) {
      setMessage('Login failed!');
      console.error('Error logging in:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white bg-opacity-25 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-medium mb-2">Email:</label>
            <input 
              type="text" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full p-2 bg-transparent-input text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-medium mb-2">Password:</label>
            <input 
              type={showPassword ? 'text' : 'password'} 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              className="w-full p-2 bg-transparent-input text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password"
            />
            <button 
              type="button" 
              onClick={togglePasswordVisibility} 
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button 
            type="submit" 
            className="w-full bg-transparent-button hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
            Login
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center font-medium ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
