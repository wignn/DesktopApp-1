import { jwtDecode } from 'jwt-decode'; 

/**
 * @typedef {Object} TokenData
 * @property {number} id
 * @property {string} nama
 * @property {string} email
 */

/**
 * 
 * @returns {TokenData|null} 
 */
export const getToken = () => {
  const token = localStorage.getItem('token');

  if (!token || token.trim() === '') {
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    
    return {
      id: parseInt(decodedToken.id, 10),
      nama: decodedToken.nama,
      email: decodedToken.email
    };
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};
