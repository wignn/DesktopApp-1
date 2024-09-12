import axios from 'axios';
import { useEffect, useState } from 'react';

const DataAccount = () => {
  const [users, setUsers] = useState([]);
  const api = import.meta.env.VITE_PUBLIC_API || 'http://localhost:4001';

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${api}/data`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers(); 
  }, [api]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        await axios.delete(`${api}/data/${id}`);
        fetchUsers(); 
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg backdrop-blur-sm border border-gray-200 hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              ID: {user.id}
            </h2>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Name:</strong> {user.Name}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Email:</strong> {user.Email}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Password:</strong> {user.Password}
            </p>
            <button
              onClick={() => handleDelete(user.id)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataAccount;
