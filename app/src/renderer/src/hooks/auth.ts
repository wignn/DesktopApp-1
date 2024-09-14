import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  exp: number;
  iat: number;
  [key: string]: any; 
}

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setUser(decodedToken);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Invalid token');
        setIsAuthenticated(false);
        setUser(null);
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return { isAuthenticated, user, logout };
};

export default useAuth;
