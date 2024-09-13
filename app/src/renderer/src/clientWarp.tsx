import Wallpaper from './wallpeper'; 
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <Wallpaper /> 
      <main>
        <Outlet /> 
      </main>
    </div>
  );
};
export default MainLayout