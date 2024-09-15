import axios from 'axios';
import { useEffect, useState } from 'react';
import { getToken } from '@renderer/utils/decode';

const DataAccount = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = import.meta.env.VITE_PUBLIC_API || 'http://localhost:4001';
  const token = getToken();

  useEffect(() => {
    if (token) {
      const fetchUsers = async () => {
        try {
          const response = await axios.get(`${api}/dataAcount/${token.id}`);
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    } else {
      setLoading(false);
    }
  }, [api, token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        await axios.delete(`${api}/data/${id}`);
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  if (loading) {
    return <div className="container mx-auto p-8 flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!token) {
    return (
      <div className="container mx-auto p-8 flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">No Users Found</h2>
          <p className="text-lg text-gray-700">You are not authorized to view this data.</p>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="container mx-auto p-8 flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">No Users Found</h2>
          <p className="text-lg text-gray-700">There are no users available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {users.map((data) => (
          <div
            key={data.id}
            className="bg-white text-black bg-opacity-20 p-6 rounded-lg shadow-lg backdrop-blur-sm border border-gray-200 hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900">ID: {data.id}</h2>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Name:</strong> {data.name}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Email:</strong> {data.email}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Password:</strong> {data.password}
            </p>
            <button
              onClick={() => handleDelete(data.id)}
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
