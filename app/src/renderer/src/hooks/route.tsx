import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './auth'; 

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/'); 
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
